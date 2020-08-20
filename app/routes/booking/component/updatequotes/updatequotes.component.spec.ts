import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatequotesComponent } from './updatequotes.component';

describe('UpdatequotesComponent', () => {
  let component: UpdatequotesComponent;
  let fixture: ComponentFixture<UpdatequotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatequotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatequotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
