import { LoginService } from './../Services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Ng6NotifyPopupService } from 'ng6-notify-popup';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: LoginService, private notify: Ng6NotifyPopupService) {}
  canActivate(): boolean {
    const role = this.authService.getRole();
    if (role === 'Admin') {

      return true;
    }
    this.notify.show('You`re not authorized to view this page', { position: 'top', duration: '2000', type: 'error' });
    return false;
  }
}
