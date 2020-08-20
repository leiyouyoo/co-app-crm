import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryListOceanComponent } from './inquiry-ocean.component';

describe('InquiryListOceanComponent', () => {
  let component: InquiryListOceanComponent;
  let fixture: ComponentFixture<InquiryListOceanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InquiryListOceanComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryListOceanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
