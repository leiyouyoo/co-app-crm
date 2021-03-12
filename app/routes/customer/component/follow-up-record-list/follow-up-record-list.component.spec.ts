import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpRecordListComponent } from './follow-up-record-list.component';

describe('FollowUpRecordListComponent', () => {
  let component: FollowUpRecordListComponent;
  let fixture: ComponentFixture<FollowUpRecordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowUpRecordListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpRecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
