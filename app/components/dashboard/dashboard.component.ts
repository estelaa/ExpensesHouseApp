import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';

import { UserService } from '../../service/user.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  
  userLogged: User;
  products: boolean;
  upload: boolean;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getUser();

    this.products=true;
    this.upload=false;
  }

  getUser(): void{
    this.userLogged = this.userService.getUserLoggedIn();
  }

  someMethod() {
    this.trigger.openMenu();
  }

  goUpload(){
    //this.router.navigateByUrl("/upload");
    this.upload=true;
    this.products=false;
  }

}
