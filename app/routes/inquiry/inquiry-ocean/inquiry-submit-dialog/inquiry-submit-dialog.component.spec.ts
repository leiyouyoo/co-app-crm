import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquirySubmitDialogComponent } from './inquiry-submit-dialog.component';

describe('InquirySubmitDialogComponent', () => {
  let component: InquirySubmitDialogComponent;
  let fixture: ComponentFixture<InquirySubmitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquirySubmitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquirySubmitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
