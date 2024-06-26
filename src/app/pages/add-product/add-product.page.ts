import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required]
    });
  }

  ngOnInit() { }

  onSubmit() {
    if (this.productForm.valid) {
      const product: Product = {
        ...this.productForm.value,
        dateAdded: '' // La fecha se establecerá en el servicio
      };

      this.productService.addProduct(product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
