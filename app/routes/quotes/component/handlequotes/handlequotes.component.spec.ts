import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlequotesComponent } from './handlequotes.component';

describe('HandlequotesComponent', () => {
  let component: HandlequotesComponent;
  let fixture: ComponentFixture<HandlequotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandlequotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandlequotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
