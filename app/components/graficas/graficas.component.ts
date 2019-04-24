import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../service/product.service';

import { Elements } from '../../model/elements';



@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  view: number[] = [300, 300];
  view2: number[] = [400, 300];
  view3: number[] = [500, 200];
  isRealtime: boolean;
  showLegend: boolean;
  showLegendPie: boolean;
  interval: number;
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  showXAxisLabel: boolean;
  showYAxisLabel: boolean;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  xAxisLabel = 'Number';
  yAxisLabel = 'Value';
  timeline = false;
  // line, area
  autoScale = true;

  public single: Elements[];
  public data: Elements[];
  public series: Elements[];
 

  public multi = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.isRealtime = true;
    this.showLegend = false;
    this.showLegendPie=false;

    this.showXAxisLabel =false;
    /*this.series=[{
      "name": "2010",
      "value": Math.floor(100 + Math.random() * 500)
    }];*/
   
    this.getProducts();
    
     
      
  }

  getProducts(): void {
    this.productService.getAllUserPaid()
      .subscribe((res: Elements[])=> {
        console.log('success', res);
        this.single=res;
      }); 
    
    this.productService.getTypePaid()
      .subscribe((res: Elements[])=> {
        console.log('success', res);
        this.data=res;
      });

    this.productService.getMonthPaid()
      .subscribe((res: Elements[])=> {
        console.log('success', res);
        this.series=res;
        this.multi = [
          {
            "name": "Paid",
            "series": this.series
          }
        ]; 
      });
  }

 


}




