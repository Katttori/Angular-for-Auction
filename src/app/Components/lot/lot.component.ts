import { LoginService } from './../../Services/login.service';
import { ActivatedRoute } from '@angular/router';
import { LotService } from './../../Services/lot.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Lot from 'src/app/models/Lot';
import { Ng6NotifyPopupService } from 'ng6-notify-popup';

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
  sold: boolean;
  constructor(private fb: FormBuilder,
     private lotService: LotService,
      private route: ActivatedRoute,
       private authService: LoginService,
        private notify: Ng6NotifyPopupService) { }

  MakeBet() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bet = this.form.value.Bet;
    this.lotService.makeBet(id, this.bet).subscribe(data => {
      },
      error => {
      console.log(error.message);
      this.notify.show('Input amount of bet', { position: 'top', duration: '2000', type: 'error' });
    },
    () => {
      console.log('bet made');
      this.notify.show('Bet made', { position: 'top', duration: '2000', type: 'success' });
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
      this.sold = this.lot.product.isSold;
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
      error => {
        console.log(error.message);
        this.notify.show('Cant end bidding', { position: 'top', duration: '2000', type: 'error' }); },
      () => this.notify.show('Bidding ended', { position: 'top', duration: '2000', type: 'success' })
    );
  }

  startTimer() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.lotService.startTimer(id).subscribe(
      data => console.log(data),
      error => {
        console.log(error.message);
        this.notify.show('Error in timer', { position: 'top', duration: '2000', type: 'error' }); },
      () => this.notify.show('Bidding ended', { position: 'top', duration: '2000', type: 'success' })
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
