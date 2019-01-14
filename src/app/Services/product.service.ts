import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, catchError } from 'rxjs/operators';
import { Observable, of, throwError, pipe} from 'rxjs';
import Product from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public API = 'http://localhost:53119/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API}/get/user`).pipe(
      map(res => res),
        catchError( this.errorHandler)
    );
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API}/get`).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }

  getToConfirm(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API}/get/confirmation`).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API}/get/${id}`).pipe(
      map(res => res),
        catchError( this.errorHandler)
    );
  }

  create(product: Product): Observable<Object> {
    return this.http.post(`${this.API}/create`, product).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }

  update(product: Product): Observable<Object> {
    return this.http.put(`${this.API}/update`, product).pipe(
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

  updateCategory(id: number, categoryName: string): Observable<Object> {
    return this.http.put(`${this.API}/update/${id}/${categoryName}`, null).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }
  confirm(id: number): Observable<Object> {
    return this.http.put(`${this.API}/confirm/${id}`, null).pipe(
      map(res => res),
      catchError(this.errorHandler)
    );
  }
  errorHandler(error: Response) {
    console.log(error);
    return throwError(error);
  }
}
