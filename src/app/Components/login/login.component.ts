import { LoginService } from './../../Services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  globalResponse: any;
  form: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: LoginService) { }

  Login(): void {
     const user = this.form.value;
    // this.isLoggedIn=false;
      this.authService.removeToken();
    // this.alerts=[];
    // console.log(user);
        this.authService.ValidateUser(user)
            .subscribe((result) => {
              this.globalResponse = result;
            },
            error => { // This is error part
              console.log(error.message);
            },
            () => {
                //  This is Success part
                console.log('login successful');
                this.authService.storeToken(this.globalResponse.access_token);
                }
              );
            }
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

}
