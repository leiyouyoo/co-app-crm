import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationPositionComponent } from './relation-position.component';

describe('RelationPositionComponent', () => {
  let component: RelationPositionComponent;
  let fixture: ComponentFixture<RelationPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RelationPositionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
