import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { MatMenuTrigger } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  sideMenu: boolean;
  
  userLogged: User;

  constructor(
    private userService: UserService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
    this.sideMenu=false;

  }

  getUser(): void{
    this.userLogged = this.userService.getUserLoggedIn();
  }


  goLogin(){
    this.userService.delUserLoggedIn();
    this.router.navigateByUrl("/login");
  }

  goHome(){
    this.router.navigateByUrl("/dashboard");
  }

  goUpload(){
    this.router.navigateByUrl("/upload");
  }

  seeSidevar(){
    if(this.sideMenu){
      this.sideMenu=false;
    }else{
      this.sideMenu=true;
    }
    
  }
}
