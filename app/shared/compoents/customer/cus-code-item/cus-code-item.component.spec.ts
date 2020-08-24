import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusCodeItemComponent } from './cus-code-item.component';

describe('CusCodeItemComponent', () => {
  let component: CusCodeItemComponent;
  let fixture: ComponentFixture<CusCodeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusCodeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusCodeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
