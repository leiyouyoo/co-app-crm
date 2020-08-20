import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { initiativeCreatequotesComponent } from './initiativecreatequotes.component';

describe('CreatequotesComponent', () => {
  let component: initiativeCreatequotesComponent;
  let fixture: ComponentFixture<initiativeCreatequotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ initiativeCreatequotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(initiativeCreatequotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
