import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecycleConfigComponent } from './recycle-config.component';

describe('RecycleConfigComponent', () => {
  let component: RecycleConfigComponent;
  let fixture: ComponentFixture<RecycleConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecycleConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecycleConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
