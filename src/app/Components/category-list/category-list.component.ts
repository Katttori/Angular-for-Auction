import CategoryService from './../../Services/category.service';
import { Component, OnInit } from '@angular/core';
import Category from '../../models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[];
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => {
       this.categories = data;
      },
      error => { // This is error part
       console.log(error.message);
     },
     () => {
         //  This is Success part
         console.log('categories have got successful');
         }
       );
  }

}
