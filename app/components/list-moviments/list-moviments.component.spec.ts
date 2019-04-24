import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMovimentsComponent } from './list-moviments.component';

describe('ListMovimentsComponent', () => {
  let component: ListMovimentsComponent;
  let fixture: ComponentFixture<ListMovimentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMovimentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMovimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
