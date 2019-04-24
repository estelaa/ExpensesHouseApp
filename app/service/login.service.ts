import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class LoginService {

  constructor(private http: HttpClient) { }

  login(name:string, password:string) { 
     //Establecemos cabeceras
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this.http.post('http://localhost:8080/user/login', {
      name: name,
      password: password,       
    }, {headers: headers});     
  }


}
