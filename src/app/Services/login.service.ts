import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError } from 'rxjs/operators';
import { Observable, of, throwError, pipe} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public API = 'http://localhost:53119';
  constructor(private http: HttpClient) { }
  ValidateUser (user: any) {
const userData = `username=${user.email}&password=${user.password}&grant_type=password`;
const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
return this.http.post(`${this.API}/token`, userData , { headers: reqHeader })
.pipe(
  map(res => res),
    catchError( this.errorHandler)
);
}
logOut() {
  this.removeRole();
  this.removeToken();
  this.http.post(`${this.API}/logout`, null).pipe(
    map(res => res),
    catchError(this.errorHandler)
  );
}

storeToken(token: string) {
  localStorage.setItem('token', token);
}
getToken() {
  return localStorage.getItem('token');
}
getRole() {
  return localStorage.getItem('role');
}
errorHandler(error: Response) {
  console.log(error);
  return throwError(error);
}
storeRole(role: string) {
  localStorage.setItem('role', role);
}
removeRole() {
 localStorage.removeItem('role');
}
public isAuthenticated(): boolean {
  return this.getToken() !== null;
}
removeToken() {
 localStorage.removeItem('token');
}
}
