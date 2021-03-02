import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeCustomerComponent } from './merge-customer.component';

describe('MergeCustomerComponent', () => {
  let component: MergeCustomerComponent;
  let fixture: ComponentFixture<MergeCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergeCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
