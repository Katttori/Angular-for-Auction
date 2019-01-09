import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, catchError } from 'rxjs/operators';
import { Observable, of, throwError, pipe} from 'rxjs';
import Category from '../models/category';

@Injectable({
  providedIn: 'root'
})
export default class CategoryService {

  public API = 'http://localhost:53119/api/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.API}/get`).pipe(
      map(res => res),
        catchError( this.errorHandler)
    );
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.API}/get/${id}`).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }

  create(category: Category): Observable<Object> {
    return this.http.post(`${this.API}/create`, category).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }

  update(category: Category): Observable<Object> {
    console.log('called');
    return this.http.put(`${this.API}/update`, category).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${this.API}/delete/${id}`).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: Response) {
    console.log(error);
    return throwError(error);
  }
}
