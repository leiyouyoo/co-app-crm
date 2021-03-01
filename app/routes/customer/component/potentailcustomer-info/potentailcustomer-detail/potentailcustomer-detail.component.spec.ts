import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentailcustomerDetailComponent } from './potentailcustomer-detail.component';

describe('PotentailcustomerDetailComponent', () => {
  let component: PotentailcustomerDetailComponent;
  let fixture: ComponentFixture<PotentailcustomerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotentailcustomerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentailcustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
