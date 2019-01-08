import { LotService } from './../../Services/lot.service';
import { Component, OnInit } from '@angular/core';
import Lot from 'src/app/models/Lot';

@Component({
  selector: 'app-lots-list',
  templateUrl: './lots-list.component.html',
  styleUrls: ['./lots-list.component.css']
})
export class LotsListComponent implements OnInit {

  lots: Lot[];
  constructor(private lotService: LotService) { }

  ngOnInit() {
     this.lotService.getActiveLots()
      .subscribe( data => {this.lots = data;
      }, error => {
      console.log(error.message);
    },
    () => {
      console.log('lots have got successful');
    }
    );
  }

}
