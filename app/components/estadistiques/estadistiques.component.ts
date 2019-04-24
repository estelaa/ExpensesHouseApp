import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Elements } from '../../model/elements';


@Component({
  selector: 'app-estadistiques',
  templateUrl: './estadistiques.component.html',
  styleUrls: ['./estadistiques.component.css']
})
export class EstadistiquesComponent implements OnInit {

  view: number[] = [300, 300];
  view2: number[] = [500, 400];
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

  /*** */
  inici;
  final;
  showCharts: boolean = false;

  private type_char=["pie","bar-vertical"];
  public pie: Elements[];
  public barvertical: Elements[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.isRealtime = true;
    this.showLegend = false;
    this.showLegendPie=false;
    this.showXAxisLabel =false;
  }

  submit(){
    this.showCharts=true;
    let dateInici=null;
    let dateFinal=null;
    if(this.inici!=undefined)
      dateInici = this.inici.year+"-"+this.inici.month+"-"+this.inici.day;
    

    if(this.final!=undefined)
      dateFinal = this.final.year+"-"+this.final.month+"-"+this.final.day;
    

    this.type_char.forEach(element => {
      this.productService.getElementsByDate(dateInici,dateFinal,element)
        .subscribe((res: Elements[])=> {
          switch(element){
            case "pie":
              this.pie=res;
              break;
            case "bar-vertical":
              this.barvertical=res;
              break; 
          }
        });
    });
  }

}
