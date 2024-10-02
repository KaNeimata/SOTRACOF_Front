import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegleCalculComponent } from './regle-calcul.component';

describe('RegleCalculComponent', () => {
  let component: RegleCalculComponent;
  let fixture: ComponentFixture<RegleCalculComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegleCalculComponent]
    });
    fixture = TestBed.createComponent(RegleCalculComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
