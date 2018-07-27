import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Paging } from './../models/paging';
import { Book } from './../models/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  bookId: Number;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  public apiUrl = 'http://localhost:1240/';
  constructor(private http: HttpClient,
    private location: Location,
    private route: ActivatedRoute) {
    this.route.params
      .subscribe(params => {
        if (this.bookId !== parseInt(params['id'])) {
          //console.log(parseInt(params['id']))
          this.findBook();
        }
      });
  }

  ngOnInit() {
    this.findBook();
  }

  findBooks() {
    this.bookId = parseInt(this.route.snapshot.paramMap.get('id'));

    let requestUrl = this.apiUrl + 'book/find/'+this.bookId;
    return this.http.get<Book>(requestUrl)
      .subscribe(book => {
        console.log(book);
        this.book = book;
      });
  }
  findBook() {
    this.bookId = parseInt(this.route.snapshot.paramMap.get('id'));

    let requestUrl = this.apiUrl + 'api/findId';
    return this.http.post<Book>(requestUrl,
      JSON.stringify({ id: this.bookId }),
      this.httpOptions)
      .subscribe(book => {
        console.log(book);
        this.book = book;
      });
  }

}
