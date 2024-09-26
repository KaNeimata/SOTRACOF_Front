import { Component, OnInit } from '@angular/core';
import { IntitulesComponent } from '../intitules/intitules.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChampsDate, ModelFacture, Champs } from 'src/app/config/app.model';
import { AppServices } from 'src/app/config/app.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-model-facture',
  templateUrl: './model-facture.component.html',
  styleUrls: ['./model-facture.component.css']
})
export class ModelFactureComponent implements OnInit {

  modelFactureForm: FormGroup;
  champsDisponibles: Champs[] = [];   //champs dispo
  modelFactures: ModelFacture[] = [];  // Liste des modèles
  selectedModelFacture: ModelFacture | null = null;  // Modèle sélectionné pour modification
  displayDialog: boolean = false;
  isEditing: boolean = false;
  displayAddDialog: boolean = false; 
  displayEditDialog: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modelFactureService: AppServices,
    private messageService: MessageService
  ) {
    this.modelFactureForm = this.fb.group({
      nom: ['', Validators.required],  // Nom du modèle de facture
      champs: [[], Validators.required]  // Champs associés au modèle
    });
  }

  ngOnInit(): void {
    this.loadChamps();  // Charger les champs disponibles
    this.loadModelFactures();  // Charger les modèles de facture existants
  }

  // Charger les champs disponibles pour le modèle
  loadChamps() {
    this.modelFactureService.getAllChamps().subscribe((champs: Champs[]) => {
      this.champsDisponibles = champs;
    });
  }

  // Charger les modèles de facture existants
  loadModelFactures() {
    this.modelFactureService.getAllModelFactures().subscribe((modelsFact) => {
      this.modelFactures = modelsFact.body || [];
      console.log('Success: donnee charger', this.modelFactures);
    });
  }
// pop up to add
  openAddDialog() {
    this.isEditing = false;
    this.modelFactureForm.reset();  // Réinitialiser le formulaire
    this.displayDialog = true; // Ouvrir le dialogue
  }
  // edit
  openEditDialog(model: ModelFacture) {
    this.isEditing = true;
    this.selectedModelFacture = model;
    this.modelFactureForm.patchValue(model);  // Remplir le formulaire
    this.displayDialog = true; // Ouvrir le dialogue
  }
  // Créer ou mettre à jour un modèle de facture
  onSubmit() {
    if (this.modelFactureForm.valid) {
      const modelData = this.modelFactureForm.value;

      console.log('Données envoyées au backend:', modelData); 

    if (modelData.champs.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez sélectionner au moins un champ' });
      return;
    }

    if (this.selectedModelFacture) {
      // Mise à jour d'un modèle existant
      this.modelFactureService.updateModelFacture(modelData).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Modèle mis à jour avec succès' });
          this.loadModelFactures();
          this.cancelEdit();  // Fermer le dialog après la mise à jour
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour du modèle' });
        }
      );
    }

      else {
        // Créer un nouveau modèle
        this.modelFactureService.createModelFacture(modelData).subscribe(
          (response) => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Modèle créé avec succès' });
            this.loadModelFactures();
            this.cancelEdit();
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la création du modèle' });
          }
        );
      }
    }
  }

  cancelAdd(): void {
  this.displayAddDialog = false;
  this.modelFactureForm.reset();
}
  cancelEdit(): void {
  this.displayEditDialog = false;
  this.modelFactureForm.reset();
}


  // Sélectionner un modèle pour modification
  editModelFacture(model: ModelFacture) {
    this.selectedModelFacture = model;
    this.modelFactureForm.patchValue(model);  // Remplir le formulaire avec les données du modèle sélectionné
  }

  // Supprimer un modèle de facture
  deleteModelFacture(id: number) {
    this.modelFactureService.deleteModelFacture(id).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Modèle supprimé avec succès' });
        this.loadModelFactures();
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression du modèle' });
      }
    );
  }

  // Réinitialiser le formulaire
  resetForm() {
    // this.selectedModelFacture = null;
    this.modelFactureForm.reset();
    this.displayDialog = false; // Fermer le dialogue

  }
}
