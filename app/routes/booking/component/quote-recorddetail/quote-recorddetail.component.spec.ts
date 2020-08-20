import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteRecorddetailComponent } from './quote-recorddetail.component';

describe('QuoteRecorddetailComponent', () => {
  let component: QuoteRecorddetailComponent;
  let fixture: ComponentFixture<QuoteRecorddetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteRecorddetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteRecorddetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
