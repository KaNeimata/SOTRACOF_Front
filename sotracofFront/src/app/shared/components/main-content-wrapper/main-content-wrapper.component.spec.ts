import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentWrapperComponent } from './main-content-wrapper.component';

describe('MainContentWrapperComponent', () => {
  let component: MainContentWrapperComponent;
  let fixture: ComponentFixture<MainContentWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainContentWrapperComponent]
    });
    fixture = TestBed.createComponent(MainContentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
