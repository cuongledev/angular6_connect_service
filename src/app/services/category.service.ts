import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Category} from '../models/category';
import {Paging} from '../models/paging';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public apiUrl = 'http://localhost:1240/';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl + 'api/categories')
            .pipe(
              tap(cates => this.log(`fetched categories`)),
                catchError(this.handleError('getCategories', []))
          );
  }

  private handleError<T> (operation = 'operation', result?: T) {
  	return (error: any): Observable<T> => {

    	// TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead

	    // TODO: better job of transforming error for user consumption
	    this.log(`${operation} failed: ${error.message}`);

	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
  }

  private log(message: string) {
  	// console.log(`Category log: ${message}`);
  	// this.messageService.add('HeroService: ' + message);
  }

}
