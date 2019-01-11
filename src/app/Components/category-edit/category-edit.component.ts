import CategoryService from 'src/app/Services/category.service';
import Category from 'src/app/models/category';
import { Component, OnInit } from '@angular/core';
import { Ng6NotifyPopupService } from 'ng6-notify-popup';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  newName: string;
  categories: Category[];
  selectedCategory: Category;
  constructor(private categoryService: CategoryService, private notify: Ng6NotifyPopupService) { }

  onSelect(category: Category): void {
    this.selectedCategory = category;
  }

  create() {
    const newCategory: Category = new Category();
    newCategory.name = this.newName;
    this.categoryService.create(newCategory).subscribe(data => console.log(data),
    error => {console.log(error.message);
      this.notify.show('Cant create', { position: 'top', duration: '2000', type: 'error' }); },
       () => this.notify.show('Created', { position: 'top', duration: '2000', type: 'success' }));
  }
  save(): void {
    console.log('clicked');
    this.categoryService.update(this.selectedCategory).subscribe( data => {},
       error => {console.log(error.message);
        this.notify.show('Cant save', { position: 'top', duration: '2000', type: 'error' }); },
        () => this.notify.show('Saved', { position: 'top', duration: '2000', type: 'success' }));
  }
  delete(): void {
    this.categoryService.delete(this.selectedCategory.id).subscribe( data => console.log(data),
      error => {console.log(error.message);
        this.notify.show('Cant delete', { position: 'top', duration: '2000', type: 'error' }); },
       () => this.notify.show('Deleted', { position: 'top', duration: '2000', type: 'success' }));
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
