import { Component, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';

import { CategoryService } from './services/category.service';
import { Category } from './models/category';
import { Paging } from './models/paging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  categories: Category[];
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getListCategorys();
  }

  getListCategorys() {


    // console.log('Get Students and Update Table');
    return this.categoryService.getCategories().subscribe(
      categories => {
        //console.log(categories);
        this.categories = categories
      },
      err => console.error(err),
      () => console.log('done loading data categories')
    );

  }
}
