import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPackingListComponent } from './new-packing-list.component';

describe('NewPackingListComponent', () => {
  let component: NewPackingListComponent;
  let fixture: ComponentFixture<NewPackingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPackingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPackingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
