import { LotService } from './../../Services/lot.service';
import { ActivatedRoute } from '@angular/router';
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

  sold: string;
  confirmed: string;
  product: Product;
  img: string;
  constructor(private productService: ProductService,  private route: ActivatedRoute, private lotService: LotService) { }

  getBools() {
    if (this.product.sold) {
      this.sold = 'This product is sold';
    } else {
      this.sold = 'This product is not sold';
    }
    if (this.product.confirmed) {
      this.confirmed = 'This product is confirmed';
    } else {
      this.confirmed = 'This product is not confirmed';
    }

  }
  get() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
    .subscribe(data => {this.product = data; }
      , error => {console.log(error.message); }
      , () => {console.log('Product have got successful');
    this.getBools();
    this.img = this.getImg(); });
  }

  makeLot() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.lotService.createLot(id).subscribe(
      data => console.log(data),
    error => {console.log(error.message); });
  }

  getImg(): string {
    return this.product.img;
  }
  ngOnInit() {
    this.get();
  }

}
