import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BookComponent } from '../book/book.component';
import { BookDetailComponent } from '../book-detail/book-detail.component';


const appRoutes: any = [
  { path: 'cate-list/:cateId', component: BookComponent },
  { path: 'detail/:id', component: BookDetailComponent },
  { path: '',component: BookComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
