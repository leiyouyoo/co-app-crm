import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquirydetailComponent } from './inquirydetail.component';

describe('InquirydetailComponent', () => {
  let component: InquirydetailComponent;
  let fixture: ComponentFixture<InquirydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquirydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquirydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
