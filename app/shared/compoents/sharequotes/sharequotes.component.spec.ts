import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharequotesComponent } from './sharequotes.component';

describe('SharequotesComponent', () => {
  let component: SharequotesComponent;
  let fixture: ComponentFixture<SharequotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharequotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharequotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
