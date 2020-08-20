import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareDetailsComponent } from './shared-details.component';

describe('ShareDetailsComponent', () => {
  let component: ShareDetailsComponent;
  let fixture: ComponentFixture<ShareDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShareDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
