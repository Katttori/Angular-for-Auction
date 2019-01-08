import { ProductService } from './../../Services/product.service';
import { Component, OnInit } from '@angular/core';
import Product from '../../models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
     },
     error => { // This is error part
      console.log(error.message);
    },
    () => {
        //  This is Success part
        console.log('products have got successful');
        }
      );
  }

}
