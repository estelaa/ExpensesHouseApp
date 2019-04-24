import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Item } from '../../model/Item';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-load-file',
  templateUrl: './load-file.component.html',
  styleUrls: ['./load-file.component.css']
})
export class LoadFileComponent implements OnInit {

  private items:Array<Item>;
  

  constructor(private productService: ProductService, private router: Router) {
    this.items= new Array<Item>();
   }

  ngOnInit() {
  }

  arrayBuffer:any;
  file:File;


  incomingfile(event) {
    this.file= event.target.files[0]; 
  }

  Upload() {
    let fileReader = new FileReader();
      fileReader.onload = (e) => {
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          var arr = new Array();
          for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, {type:"binary"});
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
      
          /************************* */
          let allTextLines= XLSX.utils.sheet_to_csv(worksheet);
          let lines = allTextLines.split('\n');

          for(let i=3; i<lines.length-1;i++){
            let data1 = lines[i].split(',');
            let item1 = new Item();
            item1.concept=data1[0].toLocaleLowerCase();
            item1.date=data1[1];
            item1.paid=-parseFloat(data1[4]);
            if(item1.paid>0)this.items.push(item1);
          }         
      }
      fileReader.readAsArrayBuffer(this.file);
  }

  addPaids(){
    let items = new Array<Item>();
    for(let i=0; i<this.items.length; i++){
      //console.log(this.items[i].option);
      if(this.items[i].option){
        this.productService.addProductWithDate(this.items[i].concept,this.items[i].paid,this.items[i].type,this.items[i].date)
          .subscribe(res =>{
            this.router.navigateByUrl("/dashboard");
          });
        items.push(this.items[i]);
      }
    }
    
  }

}
