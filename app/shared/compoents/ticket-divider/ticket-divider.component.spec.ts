import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDividerComponent } from './ticket-divider.component';

describe('TicketDividerComponent', () => {
  let component: TicketDividerComponent;
  let fixture: ComponentFixture<TicketDividerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDividerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
