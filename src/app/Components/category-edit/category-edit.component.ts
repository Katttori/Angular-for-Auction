import CategoryService from 'src/app/Services/category.service';
import Category from 'src/app/models/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  newName: string;
  categories: Category[];
  selectedCategory: Category;
  constructor(private categoryService: CategoryService) { }

  onSelect(category: Category): void {
    this.selectedCategory = category;
  }

  create() {
    const newCategory: Category = new Category();
    newCategory.name = this.newName;
    this.categoryService.create(newCategory).subscribe(data => {}, error => console.log(error.message), () => console.log('success'));
  }
  save(): void {
    console.log('clicked');
    this.categoryService.update(this.selectedCategory).subscribe( data => {},
       error => console.log(error.message),
        () => console.log('success'));
  }
  delete(): void {
    this.categoryService.delete(this.selectedCategory.id).subscribe( data => {},
      error => console.log(error.message),
       () => console.log('success'));
  }
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
