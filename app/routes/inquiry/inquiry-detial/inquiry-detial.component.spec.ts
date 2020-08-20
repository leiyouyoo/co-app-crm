import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryDetialComponent } from './inquiry-detial.component';

describe('InquiryDetialComponent', () => {
  let component: InquiryDetialComponent;
  let fixture: ComponentFixture<InquiryDetialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InquiryDetialComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
