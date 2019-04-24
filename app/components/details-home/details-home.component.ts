import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../service/product.service';

import { Elements } from '../../model/elements';
import { Debt } from '../../model/debt';


@Component({
  selector: 'app-details-home',
  templateUrl: './details-home.component.html',
  styleUrls: ['./details-home.component.css']
})
export class DetailsHomeComponent implements OnInit {

  total: number;
  elements: Array<Elements>;
  debts: Debt[]

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.getSumaAllElements();
    this.getProducts();
    this.getDebt();
  }

  getSumaAllElements(){
    this.productService.getSumProduct()
        .subscribe((res: number)=> {
            this.total=res;
        });
  }
  getProducts(): void {
    this.productService.getAllUserPaid()
      .subscribe((res: Array<Elements>)=> {
        this.elements=res;
      }); 
  }

  getDebt(): void{
    this.productService.getDebt()
      .subscribe((res: Debt[])=> {
        this.debts=res;
      });
  }

  editDebt(id: number){
    this.router.navigateByUrl('/debt/'+id);
  }

  delDebt(id: number){
    this.productService.delDebt(id.toString())
      .subscribe(res=>{
        console.log(res);
        window.location.reload();
        // window.location.reload();
      });
  }

}
