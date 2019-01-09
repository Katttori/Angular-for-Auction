import { LoginService } from '../Services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeratorGuard implements CanActivate {
  constructor(private authService: LoginService) {}
  canActivate(): boolean {
    const role = this.authService.getRole();
    if (role === 'Admin' || role === 'Moderator') {

      return true;
    }
    console.log('You are not authrised to view this page');
    return true;
  }
  }
