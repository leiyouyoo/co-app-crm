import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindContactsComponent } from './bind-contacts.component';

describe('BindContactsComponent', () => {
  let component: BindContactsComponent;
  let fixture: ComponentFixture<BindContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
