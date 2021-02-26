import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePotentialCustomerComponent } from './create-potential-customer.component';

describe('CreatePotentialCustomerComponent', () => {
  let component: CreatePotentialCustomerComponent;
  let fixture: ComponentFixture<CreatePotentialCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePotentialCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePotentialCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
