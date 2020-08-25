import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTimeLineComponent } from './route-time-line.component';

describe('RouteTimeLineComponent', () => {
  let component: RouteTimeLineComponent;
  let fixture: ComponentFixture<RouteTimeLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteTimeLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
