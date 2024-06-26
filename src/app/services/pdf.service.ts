import { Injectable } from '@angular/core';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generatePdf(products: Product[]): void {
    const doc = new jsPDF();

    let y = 10; // Initial Y position in the PDF

    doc.setFontSize(18);
    doc.text('Reporte de Productos', 10, y);
    y += 10;

    doc.setFontSize(12);
    products.forEach((product, index) => {
      doc.text(`Producto ${index + 1}:`, 10, y);
      y += 5;
      doc.text(`Nombre: ${product.name}`, 10, y);
      y += 5;
      doc.text(`Precio: ${product.price}`, 10, y);
      y += 5;
      doc.text(`Fecha de Agregado: ${new Date(product.dateAdded).toLocaleDateString()}`, 10, y);
      y += 10; // Add extra space between products
    });

    doc.save('reporte_productos.pdf');
  }
}
