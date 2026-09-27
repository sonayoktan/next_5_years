import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';

export async function exportGuideToPdf(
  element: HTMLElement,
  fileName = 'LifePivot-5-Yillik-Eylem-Kilavuzu.pdf'
): Promise<void> {
  const dataUrl = await toPng(element, {
    quality: 0.98,
    pixelRatio: 2,
    backgroundColor: '#ffffff'
  });

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const img = new Image();
  img.src = dataUrl;
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = (e) => reject(e);
  });

  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const totalImgHeight = (img.height * pageWidth) / img.width;

  let heightLeft = totalImgHeight;
  let position = 0;

  // Add Page 1
  pdf.addImage(dataUrl, 'PNG', 0, position, pageWidth, totalImgHeight, undefined, 'FAST');
  heightLeft -= pageHeight;

  // Add subsequent pages if content exceeds 1 page
  while (heightLeft > 5) {
    position = position - pageHeight;
    pdf.addPage();
    pdf.addImage(dataUrl, 'PNG', 0, position, pageWidth, totalImgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;
  }

  pdf.save(fileName);
}
