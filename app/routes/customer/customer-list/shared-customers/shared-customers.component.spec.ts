import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCustomersComponent } from './shared-customers.component';

describe('SharedCustomersComponent', () => {
  let component: SharedCustomersComponent;
  let fixture: ComponentFixture<SharedCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharedCustomersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
