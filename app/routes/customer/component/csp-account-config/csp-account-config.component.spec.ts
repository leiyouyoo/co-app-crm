import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CspAccountConfigComponent } from './csp-account-config.component';

describe('CspAccountConfigComponent', () => {
  let component: CspAccountConfigComponent;
  let fixture: ComponentFixture<CspAccountConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CspAccountConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CspAccountConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
