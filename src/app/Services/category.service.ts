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

  errorHandler(error: Response) {
    console.log(error);
    return throwError(error);
  }
}
