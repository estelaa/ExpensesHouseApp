import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { ListFinalCalculComponent } from './components/list-final-calcul/list-final-calcul.component';
import { LoadFileComponent } from './components/load-file/load-file.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ListMovimentsComponent } from './components/list-moviments/list-moviments.component';
import { EstadistiquesComponent } from './components/estadistiques/estadistiques.component';
import { DebtDetailComponent } from './components/debt-detail/debt-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: ProductDetailComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'grafica', component: GraficasComponent },
  { path: 'calcula', component: ListFinalCalculComponent },
  { path: 'upload', component: LoadFileComponent },
  { path: 'add', component: AddProductComponent },
  { path: 'listallmov', component: ListMovimentsComponent },
  { path: 'estadistiques', component: EstadistiquesComponent },
  { path: 'debt/:id', component: DebtDetailComponent }

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]  
})

export class AppRoutingModule { }
