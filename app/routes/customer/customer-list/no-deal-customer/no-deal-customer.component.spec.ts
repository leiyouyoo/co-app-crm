import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDealCustomerComponent } from './no-deal-customer.component';

describe('NoDealCustomerComponent', () => {
  let component: NoDealCustomerComponent;
  let fixture: ComponentFixture<NoDealCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoDealCustomerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDealCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
