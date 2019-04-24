import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

//import { ProductsComponent } from './products.component'
import { ProductService } from '../../service/product.service'


@Component({
  selector: 'ngbd-modal-confirm',
  templateUrl: './modal-focus.html',
})
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal, public productService: ProductService){}//, private productsComponent: ProductsComponent) {}
/*

  deleteAll(){
    this.productsComponent.delAllElements();
  }*/

 close(){
    this.productService.delAllProducts();
    this.modal.close('Ok click');
    window.location.reload();
 }

}

