import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurvedRouteComponent } from './curved-route.component';

describe('CurvedRouteComponent', () => {
  let component: CurvedRouteComponent;
  let fixture: ComponentFixture<CurvedRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurvedRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurvedRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
