import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SailingSchedulesContentComponent } from './sailing-schedules-content.component';

describe('SailContentComponent', () => {
  let component: SailingSchedulesContentComponent;
  let fixture: ComponentFixture<SailingSchedulesContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SailingSchedulesContentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SailingSchedulesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
