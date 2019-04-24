import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { stringify } from 'querystring';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  products : Product[];
  product : Product;

  isEdit: boolean = false;
  model;

  
  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scroll(0,0);
    this.getProduct();
  }

  getProduct(): void{
    this.productService.getProducts().subscribe((res : Product[]) => {
      this.products = res;
      const id = +this.activateRoute.snapshot.paramMap.get('id');
      this.product=this.products.find(product => product.id == id);
    });
  }

  goBack(): void {
    this.location.back();
  }

  edit(): void{
    this.isEdit=true;
  }

  del(): void{
    const id = +this.activateRoute.snapshot.paramMap.get('id');
    this.productService.delProduct(id.toString())
      .subscribe( 
        res =>  {
          if(res){
            //TO-DO: Olnly reload the table, NOT ALL PAGE
            this.router.navigateByUrl('/dashboard');      
          }
        },
      );
  }

  cancel():void {
    this.isEdit=false;
  }

  save(name: string, price:number, type: string){   
    const id = +this.activateRoute.snapshot.paramMap.get('id');
    if(price.toString()=="") price=0;
    if(name==undefined) name=this.product.name;

    if(type.toString()=="") type=this.product.type;

    let date="";
    if(this.model!=undefined){
      date = this.model.year+"-"+this.model.month+"-"+this.model.day;
    }else{
      date = "1970-01-01";
    }
    this.productService.editProduct(id.toString(),name,price.toString(),type,date);
    this.getProduct();
    this.isEdit=false;
    this.getProduct();
  }

}
