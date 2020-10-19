import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDetailModalComponent } from './address-detail-modal.component';

describe('AddressDetailModalComponent', () => {
  let component: AddressDetailModalComponent;
  let fixture: ComponentFixture<AddressDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
