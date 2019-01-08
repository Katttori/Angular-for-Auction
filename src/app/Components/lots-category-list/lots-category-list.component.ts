import { LotService } from './../../Services/lot.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Lot from '../../models/Lot';

@Component({
  selector: 'app-lots-category-list',
  templateUrl: './lots-category-list.component.html',
  styleUrls: ['./lots-category-list.component.css']
})
export class LotsCategoryListComponent implements OnInit {

  lots: Lot[];
  constructor( private route: ActivatedRoute, private lotService: LotService) { }

  getLots() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.lotService.getWithCategory(id)
      .subscribe( data => {this.lots = data;
      }, error => {
      console.log(error.message);
    },
    () => {
      console.log('lots have got successful');
    }
    );
  }
  ngOnInit() {
    this.getLots();
  }

}
