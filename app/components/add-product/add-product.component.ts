import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../service/product.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  sameUser: boolean = false;

  constructor(private productService: ProductService, 
    private router: Router,
    private userService : UserService) { }

  ngOnInit() {
  }

  addElement(name: string, price: number, type: string) {
    if(name.length>0 && price>0){
      this.productService.addProduct(name, price, type)
      .subscribe(
        res => {
          if(res){   
            this.router.navigateByUrl("/dashboard");     
          }
        },
      );
    }
  }

  addDebt(userToPaid: string, cost: number){
    this.sameUser=false;
    if(userToPaid ==  this.userService.getUserLoggedIn().name){
      this.sameUser=true;
    }else{
      this.productService.addDebt(userToPaid, cost)
      .subscribe(res=>{
        if(res){   
          this.router.navigateByUrl("/dashboard");       
        }
      });
    } 
  }
}
