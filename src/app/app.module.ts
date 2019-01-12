import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CategoryListComponent } from './Components/category-list/category-list.component';
import { LotsListComponent } from './Components/lots-list/lots-list.component';
import { LotComponent } from './Components/lot/lot.component';
import { ProductsListComponent } from './Components/products-list/products-list.component';
import { ProductComponent } from './Components/product/product.component';
import { ProductAddComponent } from './Components/product-add/product-add.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LotsCategoryListComponent } from './Components/lots-category-list/lots-category-list.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { AccountComponent } from './Components/account/account.component';
import { RegisterComponent } from './Components/register/register.component';
import { CategoryEditComponent } from './Components/category-edit/category-edit.component';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { Ng6NotifyPopupModule } from 'ng6-notify-popup';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    LotsListComponent,
    LotComponent,
    ProductsListComponent,
    ProductComponent,
    ProductAddComponent,
    LotsCategoryListComponent,
    LoginComponent,
    AccountComponent,
    RegisterComponent,
    CategoryEditComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng6NotifyPopupModule.forRoot(),
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
