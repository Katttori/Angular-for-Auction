import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Lot from '../models/Lot';
import {map, catchError } from 'rxjs/operators';
import { Observable, of, throwError, pipe} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LotService {

  public API = 'http://localhost:53119/api/lots';
  constructor(private http: HttpClient) { }

  createLot(id: number): Observable<Object> {
    return this.http.post(`${this.API}/create/${id}`, null).pipe(
    map(res => res),
      catchError(this.errorHandler)
    );
  }

  getAll(): Observable<Lot[]> {
    return this.http.get<Lot[]>(`${this.API}/get`).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }
  getWon(): Observable<Lot[]> {
    return this.http.get<Lot[]>(`${this.API}/get/user`).pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }

  getLot(id: number): Observable<Lot> {
    return this.http.get<Lot>(`${this.API}/get/${id}`).pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }

  getWithCategory(id: number): Observable<Lot[]> {
    return this.http.get<Lot[]>(`${this.API}/get/category/${id}`).pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }

  getActiveLots(): Observable<Lot[]> {
    return this.http.get<Lot[]>(`${this.API}/get/active`).pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }

  makeBet(id: number, bet: number): Observable<Object> {
    return this.http.put(`${this.API}/bet/${id}/${bet}`, null).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }

  endBidding(id: number): Observable<Object> {
    return this.http.put(`${this.API}/end/${id}`, null).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }

  startTimer(id: number): Observable<Object> {
    return this.http.put(`${this.API}/timer/start/${id}`, null).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: Response) {
    console.log(error);
        return throwError(error);
  }
}
