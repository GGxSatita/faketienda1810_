import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {

  productForm: FormGroup;
  productId: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required]
    });

    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.productService.getProductById(this.productId).subscribe((product: Product) => {
      this.productForm.patchValue(product);
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const updatedProduct: Product = {
        ...this.productForm.value,
        id: this.productId,
        dateAdded: this.productForm.value.dateAdded || new Date().toISOString()
      };

      this.productService.updateProduct(updatedProduct).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

}
