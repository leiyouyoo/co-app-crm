import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationContactComponent } from './relation-contact.component';

describe('RelationContactComponent', () => {
  let component: RelationContactComponent;
  let fixture: ComponentFixture<RelationContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RelationContactComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
