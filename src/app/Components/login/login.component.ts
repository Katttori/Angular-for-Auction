import { UserService } from './../../Services/user.service';
import { LoginService } from './../../Services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng6NotifyPopupService } from 'ng6-notify-popup';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  globalResponse: any;
  form: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: LoginService,
    private usersService: UserService,
    private router: Router,
    private notify: Ng6NotifyPopupService) { }

  Login(): void {
     const user = this.form.value;
      this.authService.removeToken();
        this.authService.ValidateUser(user)
            .subscribe((result) => {
              this.globalResponse = result;
            },
            error => { // This is error part
              console.log(error.message);
              this.notify.show('Invalid login or password', { position: 'top', duration: '2000', type: 'error' });
            },
            () => {
                //  This is Success part
                console.log('login successful');
                this.authService.storeToken(this.globalResponse.access_token);
                this.usersService.getRole().subscribe( data => this.authService.storeRole(data));
                this.notify.show('Login successful', { position: 'top', duration: '2000', type: 'success' });
                this.router.navigateByUrl('');
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
