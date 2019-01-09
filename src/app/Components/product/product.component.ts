import { Location } from '@angular/common';
import { LoginService } from './../../Services/login.service';
import { LotService } from './../../Services/lot.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../Services/product.service';
import { Component, OnInit } from '@angular/core';
import Product from 'src/app/models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  sold: boolean;
  confirmed: boolean;
  product: Product;
  editable = false;

  isModerator = false;
  constructor(private productService: ProductService,
      private route: ActivatedRoute,
      private lotService: LotService,
      private authService: LoginService,
      private router: Router) { }

  recognizeRole() {
    const role = this.authService.getRole();
    if (role === 'Admin' || role === 'Moderator') {
      this.isModerator = true;
      }
    }

  get() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
    .subscribe(data => {this.product = data; }
      , error => {console.log(error.message); }
      , () => {console.log('Product have got successful');
      this.confirmed = this.product.isConfirmed;
      this.sold = this.product.isSold; });
  }

  edit() {
    this.editable = true;
  }

  delete() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.delete(id).subscribe(data => console.log(data), error => console.log(error.message));
    this.router.navigateByUrl('/products');
  }

  save() {
    this.productService.update(this.product).subscribe(data => console.log(data), error => console.log(error.message));
    this.editable = false;
  }

  makeLot() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.lotService.createLot(id).subscribe(
      data => console.log(data),
    error => {console.log(error.message); });
  }

  confirm() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.confirm(id).subscribe(
      data => console.log(data),
      error => console.log(error.message)
    );
  }

  getImg(): string {
    return this.product.img;
  }
  ngOnInit() {
    this.get();
    this.recognizeRole();
  }

}
