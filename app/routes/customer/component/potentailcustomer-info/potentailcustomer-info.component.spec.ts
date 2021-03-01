import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentailcustomerInfoComponent } from './potentailcustomer-info.component';

describe('PotentailcustomerInfoComponent', () => {
  let component: PotentailcustomerInfoComponent;
  let fixture: ComponentFixture<PotentailcustomerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotentailcustomerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentailcustomerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
