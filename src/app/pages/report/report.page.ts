import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { PdfService } from 'src/app/services/pdf.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  reportForm: FormGroup;
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private pdfService: PdfService

  ) {
    this.reportForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.reportForm.valid) {
      const startDate = this.reportForm.value.startDate;
      const endDate = this.reportForm.value.endDate;

      this.productService.getProductsByDateRange(startDate, endDate).subscribe((products: Product[]) => {
        this.products = products;
      });
    }
  }

  generatePdf() {
    this.pdfService.generatePdf(this.products);
  }

}
