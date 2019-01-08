import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError } from 'rxjs/operators';
import { Observable, of, throwError, pipe} from 'rxjs';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  public API = 'http://localhost:53119/api/account/register';

  constructor(private http: HttpClient, private authService: LoginService) { }
  registerUser (user: User) {
    this.authService.removeToken();
    return this.http.post(this.API, user)
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  errorHandler(error: Response) {
    console.log(error);
        return throwError(error);
}
}
