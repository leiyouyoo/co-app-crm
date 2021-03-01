import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransactedCustomersComponent } from './create-transacted-customers.component';

describe('CreateTransactedCustomersComponent', () => {
  let component: CreateTransactedCustomersComponent;
  let fixture: ComponentFixture<CreateTransactedCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTransactedCustomersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransactedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
