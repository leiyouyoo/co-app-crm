import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UnownedDetailComponent } from './unowned-detial.component';

describe('UnownedDetailComponent', () => {
  let component: UnownedDetailComponent;
  let fixture: ComponentFixture<UnownedDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnownedDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnownedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
