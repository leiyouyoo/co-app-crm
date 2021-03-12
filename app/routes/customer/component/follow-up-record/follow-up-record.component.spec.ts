import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpRecordComponent } from './follow-up-record.component';

describe('FollowUpRecordComponent', () => {
  let component: FollowUpRecordComponent;
  let fixture: ComponentFixture<FollowUpRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowUpRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
