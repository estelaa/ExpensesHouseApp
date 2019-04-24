import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-final-calcul',
  templateUrl: './list-final-calcul.component.html',
  styleUrls: ['./list-final-calcul.component.css']
})
export class ListFinalCalculComponent implements OnInit {

  items: string[];
  debts: string[];
  constructor(private productService: ProductService,   private router: Router) { }

  ngOnInit() {
    this.getItemsCalcul();
  }

  getItemsCalcul(){
    this.productService.getCalcul()
    .subscribe((res: string[]) =>{
      this.items=res;
    })
    
    this.productService.getCalculWithDebt()
      .subscribe((res: string[]) =>{
        this.debts=res;
    })
  }
  
  goBack(): void {
    this.router.navigateByUrl("/dashboard");
  }

}
