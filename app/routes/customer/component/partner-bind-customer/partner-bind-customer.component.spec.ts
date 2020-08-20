import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerBindCustomerComponent } from './partner-bind-customer.component';

describe('PartnerBindCustomerComponent', () => {
  let component: PartnerBindCustomerComponent;
  let fixture: ComponentFixture<PartnerBindCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerBindCustomerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerBindCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
