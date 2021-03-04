import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindLocationComponent } from './bind-location.component';

describe('BindLocationComponent', () => {
  let component: BindLocationComponent;
  let fixture: ComponentFixture<BindLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
