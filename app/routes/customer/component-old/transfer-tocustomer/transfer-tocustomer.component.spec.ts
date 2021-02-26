import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferTocustomerComponent } from './transfer-tocustomer.component';

describe('TransferTocustomerComponent', () => {
  let component: TransferTocustomerComponent;
  let fixture: ComponentFixture<TransferTocustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransferTocustomerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferTocustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
