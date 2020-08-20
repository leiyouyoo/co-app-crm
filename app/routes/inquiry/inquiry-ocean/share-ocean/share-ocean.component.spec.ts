import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareOceanComponent } from './share-ocean.component';

describe('ShareOceanComponent', () => {
  let component: ShareOceanComponent;
  let fixture: ComponentFixture<ShareOceanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShareOceanComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareOceanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
