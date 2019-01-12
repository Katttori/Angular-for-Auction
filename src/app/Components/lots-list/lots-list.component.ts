import { LoginService } from './../../Services/login.service';
import { LotService } from './../../Services/lot.service';
import { Component, OnInit } from '@angular/core';
import Lot from 'src/app/models/Lot';

@Component({
  selector: 'app-lots-list',
  templateUrl: './lots-list.component.html',
  styleUrls: ['./lots-list.component.css']
})
export class LotsListComponent implements OnInit {

  allLots: Lot[];
  lots: Lot[];
  isAdmin = false;
  constructor(private lotService: LotService, private auth: LoginService) { }

  getActive() {
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

  getAll() {
    this.lotService.getAll()
    .subscribe( data => {this.allLots = data;
    }, error => {
    console.log(error.message);
  },
  () => {
    console.log('lots have got successful');
  }
  );
  }

  checkAdmin() {
    const role = this.auth.getRole();
    if (role === 'Admin') {
      this.isAdmin = true;
    }
  }

  ngOnInit() {
     this.getActive();
     this.checkAdmin();
     if (this.isAdmin) {
       this.getAll();
     }
  }

}
