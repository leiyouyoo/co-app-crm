import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCusCodeComponent } from './apply-cus-code.component';

describe('ApplyCusCodeComponent', () => {
  let component: ApplyCusCodeComponent;
  let fixture: ComponentFixture<ApplyCusCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyCusCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyCusCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
