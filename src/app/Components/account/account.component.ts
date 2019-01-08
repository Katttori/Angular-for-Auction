import { LotService } from './../..//Services/lot.service';
import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import Lot from '../../models/Lot';
import UserInfo from '../../models/userInfo';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  file: any;
  user: UserInfo;
  lots: Lot[];
  constructor(private userService: UserService, private lotService: LotService) { }


  ngOnInit() {
    this.userService.getInfo()
    .subscribe(data => {
      this.user = data;
     },
     error => { // This is error part
      console.log(error.message);
    },
    () => {
        //  This is Success part
        console.log('User info have got successful');
        }
      );

    this.lotService.getWon()
    .subscribe(data => {
      this.lots = data;
     },
     error => { // This is error part
      console.log(error.message);
    },
    () => {
        //  This is Success part
        console.log('lots have got successful');
        }
      );
  }

}
