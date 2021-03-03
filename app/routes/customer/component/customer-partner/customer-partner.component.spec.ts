import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPartnerComponent } from './customer-partner.component';

describe('CustomerPartnerComponent', () => {
  let component: CustomerPartnerComponent;
  let fixture: ComponentFixture<CustomerPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerPartnerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
