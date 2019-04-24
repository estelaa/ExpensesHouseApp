import { Injectable, PipeTransform } from '@angular/core';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Moviments } from '../model/moviment';
import { SortDirection } from '../components/list-moviments/sortable.directive';


interface SearchResult {
  moviments: Moviments[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(moviments: Moviments[], column: string, direction: string): Moviments[] {
  if (direction === '') {
    return moviments;
  } else {
    return [...moviments].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(moviments: Moviments, term: string, pipe: PipeTransform) {
console.log(term);
  return moviments.username.toLowerCase().includes(term) 
       || moviments.name.toLowerCase().includes(term);
}


@Injectable({
  providedIn: 'root'
})
export class MovimentService {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _moviments$ = new BehaviorSubject<Moviments[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private MOVIMENTS: Moviments[];

  private _state: State = {
    page: 1,
    pageSize: 20,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, private http: HttpClient) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._moviments$.next(result.moviments);
      this._total$.next(result.total);
    });

    this._search$.next();

    this.getListMoviments().subscribe((res: Moviments[]) => {
      this.MOVIMENTS=res;
    });
  }

  get moviments$() { return this._moviments$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let moviments = sort(this.MOVIMENTS, sortColumn, sortDirection);

    // 2. filter
    moviments = moviments.filter(moviments => matches(moviments, searchTerm, this.pipe));
    const total = moviments.length;

    // 3. paginate
    moviments = moviments.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({moviments, total});
  }

  /************HTTP Peticio**************/

  getListMoviments(){
    return this.http.get<Moviments[]>('http://localhost:8080/moviment/allelements');
  }
}
