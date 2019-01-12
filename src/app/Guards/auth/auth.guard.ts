import { LoginService } from './../../Services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ng6NotifyPopupService } from 'ng6-notify-popup';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: LoginService, private notify: Ng6NotifyPopupService) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {

      this.notify.show('You`re not authorized to view this page', { position: 'top', duration: '2000', type: 'error' });
      return false;
    }
    return true;
  }

}
