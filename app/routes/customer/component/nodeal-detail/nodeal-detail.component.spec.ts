import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodealDetailComponent } from './nodeal-detail.component';

describe('NodealDetailComponent', () => {
  let component: NodealDetailComponent;
  let fixture: ComponentFixture<NodealDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NodealDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodealDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
