import { LoginService } from './../../Services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: LoginService) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {

      console.log('You are not authrised to view this page');
      return false;
    }
    return true;
  }

}
