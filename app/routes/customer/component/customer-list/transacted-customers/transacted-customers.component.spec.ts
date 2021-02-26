import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactedCustomersComponent } from './transacted-customers.component';

describe('TransactedCustomersComponent', () => {
  let component: TransactedCustomersComponent;
  let fixture: ComponentFixture<TransactedCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactedCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
