import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnownedClientComponent } from './unowned-client.component';

describe('UnownedClientComponent', () => {
  let component: UnownedClientComponent;
  let fixture: ComponentFixture<UnownedClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnownedClientComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnownedClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
