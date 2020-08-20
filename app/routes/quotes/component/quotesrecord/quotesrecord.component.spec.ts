import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesrecordComponent } from './quotesrecord.component';

describe('QuotesrecordComponent', () => {
  let component: QuotesrecordComponent;
  let fixture: ComponentFixture<QuotesrecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotesrecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
