import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { UserService } from './user.service';

import { Product } from '../model/product';
import { Elements } from '../model/elements';
import { Debt } from '../model/debt';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private products: Product []=[];
  
  constructor(private http: HttpClient, private userService : UserService) { }

  getProducts(){
    //let headers = new HttpHeaders().set('Content-Type','application/json');
      return this.http.get<Product []>('http://localhost:8080/list/allelements');
  }

  getAllUserPaid() {
    return this.http.get<Elements[]>('http://localhost:8080/list/calcularuserpaid');
  }

  getTypePaid(){
    return this.http.get<Elements[]>('http://localhost:8080/list/calculartypepaid');
  }

  getMonthPaid(){
    return this.http.get<Elements[]>('http://localhost:8080/list/calcularmonthpaid');
  }

  getDebt(){
    return this.http.get<Debt[]>('http://localhost:8080/debt/listall');
  }

  getElementsByDate(dateInici: string, dateFinal: string, type: string){
    let params = new HttpParams();
    params = params.append('dateInici', dateInici);
    params = params.append('dateFinal', dateFinal);
    params = params.append('type', type);
    return this.http.get('http://localhost:8080/moviment/estadistiques', {params: params});  
  }

  addProduct(name: string, price: number, type: string){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    console.log("  name:"+name+"  price:"+price+"  type:"+type+"   "+this.userService.getUserLoggedIn());
    return this.http.post('http://localhost:8080/list/addelement',{ 
            name: name,
            price: price, //faltaria agafa els valors del formulari  i crea el formulari al html
            username: this.userService.getUserLoggedIn().name,     
            type: type       
       },{headers: headers});
  }
 
  addProductWithDate(name: string, price: number, type: string, date: string){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    console.log("  name:"+name+"  price:"+price+"  type:"+type+"   "+this.userService.getUserLoggedIn());
    return this.http.post('http://localhost:8080/list/addelement',{ 
            name: name,
            price: price, //faltaria agafa els valors del formulari  i crea el formulari al html
            username: this.userService.getUserLoggedIn().name,   
            date: date,  
            type: type
       },{headers: headers});

  }

  addDebt(userToPaid: string, cost: number){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    console.log("  name:"+userToPaid+"  price:"+cost+ "  user:"+this.userService.getUserLoggedIn());
    return this.http.post('http://localhost:8080/debt/adddebt',{ 
            user: this.userService.getUserLoggedIn().name, 
            userToPaid: userToPaid,       
            cost: cost, //faltaria agafa els valors del formulari  i crea el formulari al html                
       },{headers: headers});
  }


  delProduct(id: string){
      return this.http.get('http://localhost:8080/list/delelement', {params: {id: id}});
  }

  getSumProduct() {
    return this.http.get('http://localhost:8080/list/suma');
  }

  editProduct(id: string, name: string, price: string, type:string, date: string){
    console.log(id+name+price);
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('name', name);
    params = params.append('price', price);
    params = params.append('type', type);
    params = params.append('date', date);
    this.http.get<boolean>('http://localhost:8080/list/editelement', {params: params})
    .subscribe();
  }
  
  delAllProducts(){
    this.http.get('http://localhost:8080/list/delallelements').subscribe();
  }

  getCalcul(){
     return this.http.get<string[]>('http://localhost:8080/list/calcularlist');
  }

  getCalculWithDebt(){
    return this.http.get<string[]>('http://localhost:8080/debt/calcularlist');
  }

  editDebt(user: string, userToPaid: string, cost: string){
    let params = new HttpParams();
    params = params.append('user', user);
    params = params.append('userToPaid', userToPaid);
    params = params.append('cost', cost);
    return this.http.get<boolean>('http://localhost:8080/debt/editelement', {params: params});
  }

  delDebt(id: string){
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<boolean>('http://localhost:8080/debt/delelement', {params: params});
  }


}
