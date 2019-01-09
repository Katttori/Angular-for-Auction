import { LoginService } from './../../Services/login.service';
import { ProductService } from './../../Services/product.service';
import { Component, OnInit } from '@angular/core';
import Product from '../../models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  toConfirmProducts: Product[];
  allProducts: Product[];
  products: Product[];
  isModerator = false;
  isAdmin = false;
  constructor(private productService: ProductService, private authService: LoginService) { }

  recognizeRole() {
    const role = this.authService.getRole();
    if (role === 'Admin') {
      this.isModerator = true;
      this.isAdmin = true;
      this.getConfirm();
      this.getAll();
    } else {
      if (role === 'Moderator') {
        this.isModerator = true;
        this.getConfirm();
      }
    }
  }
  getAll() {
    this.productService.getAll().subscribe(data => {
      this.allProducts = data;
     },
     error => { // This is error part
      console.log(error.message);
    },
    () => {
        //  This is Success part
        console.log('all products have got successful');
        }
      );
  }
  getUsers() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
     },
     error => { // This is error part
      console.log(error.message);
    },
    () => {
        //  This is Success part
        console.log('users products have got successful');
        }
      );
  }
  getConfirm() {
    this.productService.getToConfirm().subscribe(data => {
      this.toConfirmProducts = data;
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
  ngOnInit() {
    this.getUsers();
    this.recognizeRole();
  }
}
