import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyChangePhoneComponent } from './apply-change-phone.component';

describe('ApplyChangePhoneComponent', () => {
  let component: ApplyChangePhoneComponent;
  let fixture: ComponentFixture<ApplyChangePhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyChangePhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyChangePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
