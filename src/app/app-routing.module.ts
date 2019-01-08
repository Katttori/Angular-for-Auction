import { AuthGuard } from './Guards/auth/auth.guard';
import { AccountComponent } from './Components/account/account.component';
import { ProductAddComponent } from './Components/product-add/product-add.component';
import { ProductsListComponent } from './Components/products-list/products-list.component';
import { ProductComponent } from './Components/product/product.component';
import { LotsListComponent } from './Components/lots-list/lots-list.component';
import { LotComponent } from './Components/lot/lot.component';
import { CategoryListComponent } from './Components/category-list/category-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LotsCategoryListComponent } from './Components/lots-category-list/lots-category-list.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/lots', pathMatch: 'full' },
  { path: 'lots', component: LotsListComponent},
  { path: 'categories', component: CategoryListComponent },
  { path: 'products', component: ProductsListComponent, canActivate: [AuthGuard]},
  { path: 'products/add', component: ProductAddComponent},
  { path: 'lots/:id', component: LotComponent},
  { path: 'products/:id', component: ProductComponent},
  { path: 'lots/category/:id', component: LotsCategoryListComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
