import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Debt } from '../../model/debt';
import { ProductService } from '../../service/product.service'

interface Alert {
  type: string;
}

const ALERT: Alert = {type: 'danger'};


@Component({
  selector: 'app-debt-detail',
  templateUrl: './debt-detail.component.html',
  styleUrls: ['./debt-detail.component.css']
})
export class DebtDetailComponent implements OnInit {

  debts: Debt[];
  debt: Debt;

  error: boolean=false;

  

  constructor(private productService: ProductService, 
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    window.scroll(0,0);
    this.getDebt();
  }

  getDebt(){
    this.productService.getDebt().subscribe((res : Debt[]) => {
      this.debts = res;
      const id = +this.activateRoute.snapshot.paramMap.get('id');
      this.debt=this.debts.find(debt => debt.id == id);
    });
  }

  edit(cost: number){
    console.log(cost);
    if(cost.toString()=="") cost=this.debt.cost;
    this.productService.editDebt(this.debt.user,this.debt.userToPaid,cost.toString())
      .subscribe((res: boolean )=>{
          if(res){
            this.router.navigateByUrl('/dashboard');    
          }else{
            this.error=true;
          }
      });
  }

}


