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
  constructor(private fb: FormBuilder, private lotService: LotService, private route: ActivatedRoute) { }

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

  ngOnInit() {
    this.form = this.fb.group({
      Bet: ['', [Validators.required]]
    });
    this.getSingle();
  }

}
