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
  errorHandler(error: Response) {
    console.log(error);
    return throwError(error);
  }
}
