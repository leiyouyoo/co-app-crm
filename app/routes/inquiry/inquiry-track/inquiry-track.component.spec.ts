import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryTrackComponent } from './inquiry-track.component';

describe('InquiryTrackComponent', () => {
  let component: InquiryTrackComponent;
  let fixture: ComponentFixture<InquiryTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InquiryTrackComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
