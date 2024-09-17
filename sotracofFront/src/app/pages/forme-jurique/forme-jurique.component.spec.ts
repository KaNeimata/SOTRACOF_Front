import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeJuriqueComponent } from './forme-jurique.component';

describe('FormeJuriqueComponent', () => {
  let component: FormeJuriqueComponent;
  let fixture: ComponentFixture<FormeJuriqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormeJuriqueComponent]
    });
    fixture = TestBed.createComponent(FormeJuriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
