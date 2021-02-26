import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialCustomersComponent } from './potential-customers.component';

describe('PotentialCustomersComponent', () => {
  let component: PotentialCustomersComponent;
  let fixture: ComponentFixture<PotentialCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotentialCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
