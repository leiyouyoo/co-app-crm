import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectReceivesModalComponent } from './select-receives-modal.component';

describe('SelectReceivesModalComponent', () => {
  let component: SelectReceivesModalComponent;
  let fixture: ComponentFixture<SelectReceivesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectReceivesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectReceivesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
