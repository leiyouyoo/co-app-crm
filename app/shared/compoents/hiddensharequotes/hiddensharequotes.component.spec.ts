import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiddensharequotesComponent } from './hiddensharequotes.component';

describe('HiddensharequotesComponent', () => {
  let component: HiddensharequotesComponent;
  let fixture: ComponentFixture<HiddensharequotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiddensharequotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiddensharequotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
