import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryTruckQuoteComponent } from './inquiry-truck-quote.component';

describe('InquiryTruckQuoteComponent', () => {
  let component: InquiryTruckQuoteComponent;
  let fixture: ComponentFixture<InquiryTruckQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryTruckQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryTruckQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
