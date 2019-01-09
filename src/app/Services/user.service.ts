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

  getAll(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${this.API}/get`).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }

  makeAdmin(id: string): Observable<Object> {
    return this.http.put(`${this.API}/user/${id}/Admin`, null).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }

  makeUser(id: string): Observable<Object> {
    return this.http.put(`${this.API}/user/${id}/User`, null).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }

  makeModerator(id: string): Observable<Object> {
    return this.http.put(`${this.API}/user/${id}/Moderator`, null).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }

  getRole(): Observable<string> {
    return this.http.get<string>(`${this.API}/role`).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }

  getSpecialRole(id: string): Observable<string> {
    return this.http.get<string>(`${this.API}/role/${id}`).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: Response) {
    console.log(error);
        return throwError(error);
  }
}
