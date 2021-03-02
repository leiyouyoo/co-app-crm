import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighSeasPondCustomerComponent } from './high-seas-pond-customer.component';

describe('HighSeasPondCustomerComponent', () => {
  let component: HighSeasPondCustomerComponent;
  let fixture: ComponentFixture<HighSeasPondCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighSeasPondCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighSeasPondCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
