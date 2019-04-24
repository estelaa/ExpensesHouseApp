import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userLogged: User;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void{
    this.userLogged = this.userService.getUserLoggedIn();
  }

  goHome(){
    this.router.navigateByUrl("/dashboard");
  }


  goUpload(){
    this.router.navigateByUrl("/upload");
  }

  goAddElement(){
    this.router.navigateByUrl("/add");
  }

  goShowList(){
    this.router.navigateByUrl("/listallmov");
  }

  goEstadistiques(){
    this.router.navigateByUrl("/estadistiques");
  }

}
