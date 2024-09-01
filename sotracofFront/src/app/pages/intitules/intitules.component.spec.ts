import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntitulesComponent } from './intitules.component';

describe('IntitulesComponent', () => {
  let component: IntitulesComponent;
  let fixture: ComponentFixture<IntitulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntitulesComponent]
    });
    fixture = TestBed.createComponent(IntitulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
