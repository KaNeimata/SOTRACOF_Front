import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegimeFiscaleComponent } from './regime-fiscale.component';

describe('RegimeFiscaleComponent', () => {
  let component: RegimeFiscaleComponent;
  let fixture: ComponentFixture<RegimeFiscaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegimeFiscaleComponent]
    });
    fixture = TestBed.createComponent(RegimeFiscaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
