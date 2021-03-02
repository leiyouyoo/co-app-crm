import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionCustomerComponent } from './distribution-customer.component';

describe('DistributionCustomerComponent', () => {
  let component: DistributionCustomerComponent;
  let fixture: ComponentFixture<DistributionCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
