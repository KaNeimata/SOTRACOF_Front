import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelFactureComponent } from './model-facture.component';

describe('ModelFactureComponent', () => {
  let component: ModelFactureComponent;
  let fixture: ComponentFixture<ModelFactureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelFactureComponent]
    });
    fixture = TestBed.createComponent(ModelFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
