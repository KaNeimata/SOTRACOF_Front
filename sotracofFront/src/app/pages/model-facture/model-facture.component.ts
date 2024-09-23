import { Component, OnInit } from '@angular/core';
import { IntitulesComponent } from '../intitules/intitules.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChampsDate, ModelFacture, ChampsDouble, ChampsString } from 'src/app/config/app.model';
import { AppServices } from 'src/app/config/app.service';

@Component({
  selector: 'app-model-facture',
  templateUrl: './model-facture.component.html',
  styleUrls: ['./model-facture.component.css']
})
export class ModelFactureComponent implements OnInit {

  modelForm: FormGroup;
  listChamps: ChampsDate[] = [];
  models: ModelFacture[] = [];
  selectedChamps: ChampsDate[] = [];
  displayDialog: boolean = false;
  editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modelFactureService: AppServices
  )

  {
    this.modelForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      champs: this.fb.array([], [Validators.required])

    });
  }

  ngOnInit(): void {
    this.loadlistChamps();
    this.loadModels();
    
  }

  onEdit(model: ModelFacture): void {
      // this.modelFactureService.getModelById(model.id).subscribe(model => {
      this.modelForm.patchValue(model);
      this.editMode = true;
      this.displayDialog = true;
    // });
  }
  ajouter(): void {
    this.modelForm.reset();
    this.editMode = false;
    this.displayDialog = true;
  }
  get champs(): FormArray {
    return this.modelForm.get('champs') as FormArray;
  }

  loadlistChamps(): void {
    this.modelFactureService.getAllAvailableFields().subscribe(fields => {
      this.listChamps = fields;
      console.log(this.listChamps);
    });

  }

  loadModels(): void {
    this.modelFactureService.getAllModelFacturesWithResponse().subscribe(response => {
      this.models = response.body || [];
      console.log(this.models);
    });
  }
  onFieldChange(event: any): void {
  const formArray: FormArray = this.modelForm.get('champs') as FormArray;

    formArray.clear();
    event.value.forEach((field: any) => {
      formArray.push(this.fb.control(field));
    });
  }

  onSubmit(): void {
    if (this.modelForm.valid) {
      const modelFactureData = {
        nom: this.modelForm.value.nom,
        champs: this.modelForm.value.champs.map((champId: number) => {
          return { id: champId };
        })
      };
      console.log(modelFactureData);
      this.modelFactureService.createModel(modelFactureData).subscribe(() => {
        this.loadModels();
        // this.modelForm.reset();
        this.displayDialog = false;
      });
    }
  }
  onUpdate(model: ModelFacture): void {
    if (this.modelForm.valid) {
      const modelFactureData = {
      nom: this.modelForm.value.nom,
      champs: this.modelForm.value.champs.map((champId: number) => {
        return { id: champId };
      })
    };
      this.modelFactureService.updateModel(modelFactureData).subscribe(() => {
        this.loadModels();
        this.modelForm.reset();
      });
    }
  }

  onDelete(id: number): void {
    this.modelFactureService.deleteModel(id).subscribe(() => {
      this.loadModels();
    });
  }

  cancel(): void {
    this.displayDialog = false;
  }
  get f() {
    return this.modelForm.controls;
  }

}
