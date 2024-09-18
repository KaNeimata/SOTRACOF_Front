import {Component, OnInit} from '@angular/core';
import { Validators, FormGroup, FormBuilder} from '@angular/forms';
import { TypePrestation } from 'src/app/config/app.model';
import {AppServices} from 'src/app/config/app.service';

@Component({
  selector: 'app-prestations',
  templateUrl: './prestations.component.html',
  styleUrls: ['./prestations.component.css'],
})
export class PrestationsComponent implements OnInit {
  prestations: TypePrestation[] = [];
  prestationForm: FormGroup;
  displayDialog: boolean = false;
  editMode: boolean = false;
  selectedPrestation: TypePrestation;

  constructor(private prestationService: AppServices,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllPrestations();
    this.initForm();
  }

  getAllPrestations(): void {
    this.prestationService.getAllPrestation().subscribe((response) => {
      this.prestations = response.body || [];
    });
  }

  initForm(): void {
    this.prestationForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  CreerPrestation(): void {
    this.prestationForm.reset();
    this.editMode = false;
    this.displayDialog = true;
  }

  editPrestation(prestation: TypePrestation): void {
    this.prestationForm.patchValue(prestation);
    this.editMode = true;
    this.displayDialog = true;
    this.selectedPrestation = prestation;
  }

  savePrestation(): void {
    if (this.prestationForm.valid) {
      const prestationData = this.prestationForm.value;
      if (this.editMode) {
        this.prestationService.updateTPrestation(this.selectedPrestation.id, prestationData).subscribe(() => this.getAllPrestations());
      } else {
        this.prestationService.createTPrestation(prestationData).subscribe(() => this.getAllPrestations());
      }
      this.displayDialog = false;
    } else {
      this.prestationForm.markAllAsTouched();
     }
  }

  deletePrestation(id: number): void {
    this.prestationService.deleteTPresatation(id).subscribe(() => this.getAllPrestations());
  }

  cancel(): void {
    this.displayDialog = false;
  }

  get f() {
    return this.prestationForm.controls;
  }


}
