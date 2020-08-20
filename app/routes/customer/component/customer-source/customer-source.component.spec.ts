import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSourceComponent } from './customer-source.component';

describe('CustomerSourceComponent', () => {
  let component: CustomerSourceComponent;
  let fixture: ComponentFixture<CustomerSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerSourceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
