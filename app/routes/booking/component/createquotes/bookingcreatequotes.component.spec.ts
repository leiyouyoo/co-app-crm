import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { bookingCreatequotesComponent } from './bookingcreatequotes.component';

describe('CreatequotesComponent', () => {
  let component: bookingCreatequotesComponent;
  let fixture: ComponentFixture<bookingCreatequotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ bookingCreatequotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(bookingCreatequotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
