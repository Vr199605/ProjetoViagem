// Gemini AI Service with zero-failure offline fallback
import { CONFIG } from '../config';
import { parseTravelPrompt } from '../utils/nlpParser';
import { buildCustomItinerary } from '../data/itineraries';

export async function askGeminiTravelPlanner({ prompt, userApiKey }) {
  const apiKey = userApiKey || CONFIG.GEMINI_API_KEY;

  // Initial local heuristic parse so we always have instant valid parameters
  const baseParsed = parseTravelPrompt(prompt);

  // If no API key is set, return local parse
  if (!apiKey) {
    return {
      success: true,
      mode: 'offline',
      parsed: baseParsed,
      customItinerary: buildCustomItinerary(baseParsed.destination, baseParsed.days, baseParsed.profile),
      aiNotes: 'Planejamento estruturado com base em curadoria editorial premium.'
    };
  }

  try {
    const systemPrompt = `Você é o concierge e arquiteto de viagens de alto luxo do portal VOYAGER AI.
Analise a seguinte solicitação do viajante em português e retorne ESTRITAMENTE um JSON válido (sem blocos markdown adicionais ou texto fora do JSON):
{
  "destination": "Nome do Destino Principal",
  "days": 5,
  "dates": "Mês ou período estimado",
  "budget": 6000,
  "profile": "Estilo da viagem (ex: Romântico & Intimista, Gastronômico, Ecoturismo)",
  "travelers": 2,
  "travelersLabel": "Casal (2 viajantes)",
  "transport": "Recomendação de transporte (ex: Aéreo Direto + Transfer VIP)",
  "tags": ["Gastronomia", "Vinhos", "Romântico"],
  "aiNotes": "Uma frase elegante de boas-vindas e introdução ao roteiro sob medida"
}

Solicitação do viajante: "${prompt}"`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: systemPrompt }]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024
          }
        })
      }
    );

    if (!response.ok) {
      console.warn('Gemini API responded with status:', response.status, 'Falling back to local high-precision parser.');
      return {
        success: true,
        mode: 'fallback',
        parsed: baseParsed,
        customItinerary: buildCustomItinerary(baseParsed.destination, baseParsed.days, baseParsed.profile),
        aiNotes: 'Curadoria estruturada sob os mais elevados padrões editoriais de viagem.'
      };
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('No candidate content returned from Gemini');
    }

    // Clean JSON response
    const jsonMatch = candidateText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not find JSON object in Gemini response');
    }

    const parsedJson = JSON.parse(jsonMatch[0]);

    // Ensure safe values
    const safeDays = Math.max(2, Math.min(Number(parsedJson.days) || baseParsed.days, 15));
    const finalParsed = {
      rawPrompt: prompt,
      destination: parsedJson.destination || baseParsed.destination,
      days: safeDays,
      dates: parsedJson.dates || baseParsed.dates,
      budget: Number(parsedJson.budget) || baseParsed.budget,
      profile: parsedJson.profile || baseParsed.profile,
      travelers: Number(parsedJson.travelers) || baseParsed.travelers,
      travelersLabel: parsedJson.travelersLabel || baseParsed.travelersLabel,
      transport: parsedJson.transport || baseParsed.transport,
      tags: Array.isArray(parsedJson.tags) && parsedJson.tags.length > 0 ? parsedJson.tags : baseParsed.tags
    };

    return {
      success: true,
      mode: 'gemini',
      parsed: finalParsed,
      customItinerary: buildCustomItinerary(finalParsed.destination, finalParsed.days, finalParsed.profile),
      aiNotes: parsedJson.aiNotes || 'Roteiro e cotação personalizados gerados com inteligência artificial Gemini.'
    };
  } catch (error) {
    console.warn('Gemini request failed, activating resilient local concierge:', error.message);
    return {
      success: true,
      mode: 'fallback',
      parsed: baseParsed,
      customItinerary: buildCustomItinerary(baseParsed.destination, baseParsed.days, baseParsed.profile),
      aiNotes: 'Curadoria sob medida com parâmetros otimizados para o seu perfil.'
    };
  }
}
