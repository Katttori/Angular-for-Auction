import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, catchError } from 'rxjs/operators';
import { Observable, of, throwError, pipe} from 'rxjs';
import UserInfo from '../models/userInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public API = 'http://localhost:53119/api/users';
  constructor(private http: HttpClient) { }


  getInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.API}/info`).pipe(
      map(res => res),
       catchError( this.errorHandler)
      );

  }

  errorHandler(error: Response) {
    console.log(error);
        return throwError(error);
  }
}
