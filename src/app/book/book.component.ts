import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BookService } from '../services/book.service';
import { Paging } from './../models/paging';
import { Category } from './../models/category';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  //public apiUrl = 'http://localhost:1240/';
  categories: any;
  cateId: Number = -1;
  paging: Paging;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private bookService: BookService,private http: HttpClient,private route: ActivatedRoute) { 
    this.route.params
        .subscribe(params => {
            //console.log(params['cateId']);
            if(this.cateId !== parseInt(params['cateId'])){
              this.getBooks();
            }
        });
  }

  ngOnInit() {
    this.getBooks();

  }

  onPager(newPage):void{
    console.log(newPage);
    this.getBooks(newPage);
  }


  getBooks(pageNumber: Number = 1) {
    let cateId = parseInt(this.route.snapshot.paramMap.get('cateId'));
    this.cateId = !isNaN(cateId) ? cateId : -1;
    
    return this.bookService.getBooks(cateId,pageNumber).subscribe(
        paginate => {
          console.log(paginate);
          this.paging = paginate
        },
        err => console.error(err),
        () => console.log('done loading data book')
      );
  }

}
