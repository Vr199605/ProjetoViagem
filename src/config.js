// Application configuration & API keys
export const CONFIG = {
  // Loaded securely from environment or client configuration
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || '',
  APP_NAME: 'VOYAGER AI',
  APP_TAGLINE: 'Descubra o Brasil e o Mundo com inteligência e sofisticação.',
  DEFAULT_CURRENCY: 'BRL',
  CURRENCY_SYMBOL: 'R$',
  PDF_FOOTER_NOTE: 'Documento gerado exclusivamente via Voyager AI Client Engine. Valores médios sujeitos a alterações sazonais.'
};
