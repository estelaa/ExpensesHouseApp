import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';
import { Moviments } from '../../model/moviment';
import { MovimentService } from '../../service/moviment.service';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';

@Component({
  selector: 'app-list-moviments',
  templateUrl: './list-moviments.component.html',
  styleUrls: ['./list-moviments.component.css'],
  providers: [MovimentService, DecimalPipe]
})
export class ListMovimentsComponent implements OnInit {

  moviments$: Observable<Moviments[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: MovimentService) { 
    this.moviments$ = service.moviments$;
    this.total$ = service.total$;
  }

  ngOnInit() {
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
