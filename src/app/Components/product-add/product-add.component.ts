import { ProductService } from './../../Services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Product from 'src/app/models/product';
import { Component, OnInit } from '@angular/core';
import Category from 'src/app/models/category';
import CategoryService from 'src/app/Services/category.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  form: FormGroup;
  product: Product;
  categories: Category[];
  constructor(private fb: FormBuilder, private productService: ProductService, private categoryService: CategoryService) { }

  Create() {
    this.product = this.form.value;
    this.productService.create(this.product).subscribe(data => {}, error => console.log(error.message), () => console.log('success'));
  }

  ngOnInit() {
    this.form = this.fb.group({
      Name: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      Image: ['', [Validators.required]]
    });
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
     },
     error => { // This is error part
      console.log(error.message);
    },
    () => {
        //  This is Success part
        console.log('categories have got successful');
        }
      );
  }

}
