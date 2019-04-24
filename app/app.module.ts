import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';

import { ProductService } from './service/product.service';
import { UserService } from './service/user.service';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component'
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { DetailsHomeComponent } from './components/details-home/details-home.component';
import { HeaderComponent } from './components/header/header.component';
import { ListFinalCalculComponent } from './components/list-final-calcul/list-final-calcul.component';
import { LoadFileComponent } from './components/load-file/load-file.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ListMovimentsComponent } from './components/list-moviments/list-moviments.component';
import { ModalFocusComponent } from './components/modal-focus/modal-focus.component';
import { NgbdModalConfirm } from './components/modal-focus/modal-focus';
import { NgbdSortableHeader } from './components/list-moviments/sortable.directive';
import { EstadistiquesComponent } from './components/estadistiques/estadistiques.component';
import { DebtDetailComponent } from './components/debt-detail/debt-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProductsComponent,
    ProductDetailComponent,
    GraficasComponent,
    DetailsHomeComponent,
    HeaderComponent,
    ListFinalCalculComponent,
    LoadFileComponent,
    MenuComponent,
    AddProductComponent,
    ListMovimentsComponent,
    NgbdSortableHeader,
    ModalFocusComponent,
    NgbdModalConfirm,
    EstadistiquesComponent,
    DebtDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  entryComponents:[NgbdModalConfirm],
  providers: [UserService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
