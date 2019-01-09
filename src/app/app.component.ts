import { Component, OnInit } from '@angular/core';
import { LoginService } from './Services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My internet auction!';
  isLoggedIn: boolean;
  isModerator = false;
  isAdmin = false;

  constructor(private authService: LoginService) {}

  recognizeRole() {
    const role = this.authService.getRole();
    if (role === 'Admin' || role === 'Moderator') {
      this.isModerator = true;
      this.isAdmin = true;
      } else {
        if (role === 'Moderator') {
          this.isModerator = true;
        }
      }
    }

  LogOut() {
    this.authService.removeToken();
    this.authService.removeRole();
    this.checkAuthentication();
  }
  checkAuthentication() {
    this.isLoggedIn = this.authService.isAuthenticated();
  }
  ngOnInit() {
    this.checkAuthentication();
    this.recognizeRole();
  }
}
