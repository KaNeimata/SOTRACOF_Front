import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionFiscaleComponent } from './division-fiscale.component';

describe('DivisionFiscaleComponent', () => {
  let component: DivisionFiscaleComponent;
  let fixture: ComponentFixture<DivisionFiscaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DivisionFiscaleComponent]
    });
    fixture = TestBed.createComponent(DivisionFiscaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
