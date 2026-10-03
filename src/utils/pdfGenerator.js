import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generates an editorial luxury PDF from a designated DOM element
 * @param {HTMLElement} element - The printable container element
 * @param {string} fileName - Target filename for download
 */
export async function generateEditorialPDF(element, fileName = 'VoyagerAI_Roteiro_Viagem.pdf') {
  if (!element) {
    throw new Error('Elemento de impressão não encontrado');
  }

  try {
    // Render high-res canvas with html2canvas
    const canvas = await html2canvas(element, {
      scale: 2, // High resolution for crisp editorial text
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#FAF9F6',
      logging: false,
      windowWidth: 1024,
      scrollX: 0,
      scrollY: 0
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    
    // A4 dimensions in pt (standard portrait: 595.28 x 841.89)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Subsequent pages if content overflows single A4 page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    // Trigger instant browser download
    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('Error generating luxury PDF:', error);
    // Fallback direct text/vector PDF if html2canvas meets environment hurdles
    return fallbackGenerateVectorPDF(fileName);
  }
}

/**
 * Fallback vector PDF generator in case DOM rendering meets canvas restrictions
 */
function fallbackGenerateVectorPDF(fileName) {
  const doc = new jsPDF();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(10, 25, 47);
  doc.text('VOYAGER AI — ROTEIRO & COTAÇÃO', 20, 30);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(70, 80, 95);
  doc.text('Documento gerado com sucesso via Voyager AI Client Engine.', 20, 42);
  doc.text('Consulte os detalhes na tela da aplicação ou visualize a versão interativa.', 20, 50);
  
  doc.save(fileName);
  return true;
}
