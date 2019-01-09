import { LoginService } from './../../Services/login.service';
import { ActivatedRoute } from '@angular/router';
import { LotService } from './../../Services/lot.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Lot from 'src/app/models/Lot';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.css']
})
export class LotComponent implements OnInit {

  lot: Lot;
  bet: number;
  form: FormGroup;
  isModerator = false;
  isAuthenticated = false;
  constructor(private fb: FormBuilder, private lotService: LotService, private route: ActivatedRoute, private authService: LoginService) { }

  MakeBet() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bet = this.form.value.Bet;
    this.lotService.makeBet(id, this.bet).subscribe(data => {

      },
      error => {
      console.log(error.message);
    },
    () => {
      console.log('bet made');
    });
  }

  authenticationCheck() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
  recognizeRole() {
    const role = this.authService.getRole();
    if (role === 'Admin' || role === 'Moderator') {
      this.isModerator = true;
      }
    }

  getSingle() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.lotService.getLot(id).subscribe(data => {
      this.lot = data;
    }, error => {
      console.log(error.message);
    },
    () => {
      console.log('product loaded');
    });
  }

  endBidding() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.lotService.endBidding(id).subscribe(
      data => console.log(data),
      error => console.log(error.message)
    );
  }

  ngOnInit() {
    this.form = this.fb.group({
      Bet: ['', [Validators.required]]
    });
    this.getSingle();
    this.authenticationCheck();
    if (this.isAuthenticated) {
      this.recognizeRole();
    }
  }

}
