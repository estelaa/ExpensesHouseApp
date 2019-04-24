import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFinalCalculComponent } from './list-final-calcul.component';

describe('ListFinalCalculComponent', () => {
  let component: ListFinalCalculComponent;
  let fixture: ComponentFixture<ListFinalCalculComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFinalCalculComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFinalCalculComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
