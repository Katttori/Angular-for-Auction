import { Component, OnInit } from '@angular/core';
import { LoginService } from './Services/login.service';
import { Ng6NotifyPopupService } from 'ng6-notify-popup';

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

  constructor(private authService: LoginService, private notify: Ng6NotifyPopupService) {}

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
    this.notify.show('Log Outed', { position: 'top', duration: '2000', type: 'success' });
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
