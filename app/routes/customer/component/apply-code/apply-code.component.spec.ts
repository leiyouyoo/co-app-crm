import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCodeComponent } from './apply-code.component';

describe('ApplyCodeComponent', () => {
  let component: ApplyCodeComponent;
  let fixture: ComponentFixture<ApplyCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
