import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCustomerNameComponent } from './update-customer-name.component';

describe('UpdateCustomerNameComponent', () => {
  let component: UpdateCustomerNameComponent;
  let fixture: ComponentFixture<UpdateCustomerNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCustomerNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCustomerNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
