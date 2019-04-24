import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../service/login.service';

import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  showUserNotExist: boolean = false;

  constructor(
    private loginService: LoginService, 
    private router: Router, 
    private userService: UserService) { 
    }

  ngOnInit() {
  }

  logIn(name: string, password: string, event: Event) {
    event.preventDefault(); // Avoid default action for the submit button of the login form

    // Calls service to login user to the api rest
    this.loginService.login(name, password)
      .subscribe(
        res=> { 
                if(res){
                  if(name.length==0 || password.length==0){
                    this.showUserNotExist = true;
                  }else{
                    let u: User = {name: name}; 
                    this.userService.setUserLoggedIn(u);
                    this.router.navigateByUrl('/dashboard');  
                  }                          
                }else{
                  console.log(res)
                  this.showUserNotExist = true;
               }         
        },   
    );
  }
  

}
