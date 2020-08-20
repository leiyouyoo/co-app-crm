import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackDetialComponent } from './track-detial.component';

describe('TrackDetialComponent', () => {
  let component: TrackDetialComponent;
  let fixture: ComponentFixture<TrackDetialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrackDetialComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
