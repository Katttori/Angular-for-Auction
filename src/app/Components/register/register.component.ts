import { RegistrationService } from './../../Services/registration.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import User from '../../models/user';
import { Router } from '@angular/router';
import { Ng6NotifyPopupService } from 'ng6-notify-popup';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  globalResponse: any;
  form: FormGroup;
  user: User;
  constructor(private fb: FormBuilder,
    private registerService: RegistrationService,
    private router: Router,
    private notify: Ng6NotifyPopupService) { }

    Register() {
      this.user = this.form.value;
      // this.user.Password = this.form.value.Password;
      // this.user.ConfirmPassword = this.form.value.ConfirmPassword;
      this.registerService.registerUser(this.user)
        .subscribe((result) => {
        this.globalResponse = result;
      },
      error => { // This is error part
        console.log(error.message);
        this.notify.show('Invalid input', { position: 'top', duration: '2000', type: 'error' });
      },
      () => {
          //  This is Success part
          console.log('register successful');
          this.notify.show('Registration successful', { position: 'top', duration: '2000', type: 'success' });
          this.router.navigateByUrl('/login');
          }
        );
    }
  ngOnInit() {
    this.form = this.fb.group({
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]]
    });
  }

}
