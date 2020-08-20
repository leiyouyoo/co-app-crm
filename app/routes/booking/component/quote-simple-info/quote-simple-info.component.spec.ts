import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteSimpleInfoComponent } from './quote-simple-info.component';

describe('QuoteSimpleInfoComponent', () => {
  let component: QuoteSimpleInfoComponent;
  let fixture: ComponentFixture<QuoteSimpleInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteSimpleInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteSimpleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
