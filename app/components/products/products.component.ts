import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { NgbdModalConfirm } from '../modal-focus/modal-focus';

const MODALS = {
  focusFirst: NgbdModalConfirm,
};


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<Product>;
  type: string [] = ["Compra de menjar", "Bar/Restaurant", "Oci", "Productes casa"];
  pageSize=8;
  page=1;

  
 constructor(private productService: ProductService, private router: Router, private _modalService: NgbModal) { }

  ngOnInit() {
    window.scroll(0,0);
    this.getProducts();
  }


  open(name: string) {
    this._modalService.open(MODALS[name]);
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe((res : Array<Product>) => {
          this.products = res    
      });
  }

  addElement(name: string, price: number, type: string) {
    if(name.length>0 && price>0){
      this.productService.addProduct(name, price, type)
      .subscribe(
        res => {
          if(res){   
            window.location.reload();        
          }
        },
      );
    }
  }

  delElement(id: string){
    console.log(id);
    this.productService.delProduct(id)
      .subscribe( 
        res =>  {
          if(res){
            //TO-DO: Olnly reload the table, NOT ALL PAGE
            this.router.navigateByUrl('/dashboard');
            window.location.reload();        
          }
        },
      );
  } 

  editElement(id: number){
    this.router.navigateByUrl("/detail/"+id);
  }

  delAllElements(){
    this.productService.delAllProducts();
    window.location.reload();
  }

  goCalcul(){
    this.router.navigateByUrl("/calcula");
  }


}
