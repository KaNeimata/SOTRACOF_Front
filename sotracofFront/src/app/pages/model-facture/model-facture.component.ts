import { Component, OnInit } from '@angular/core';
import { IntitulesComponent } from '../intitules/intitules.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelFacture, Champs, Client, TypePrestation } from 'src/app/config/app.model';
import { AppServices } from 'src/app/config/app.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-model-facture',
  templateUrl: './model-facture.component.html',
  styleUrls: ['./model-facture.component.css']
})
export class ModelFactureComponent implements OnInit {

  modelFactureForm: FormGroup;
  champsDisponibles: Champs[] = [];  //champs dispo
  clients: Client[] = [];
  listPrestations: TypePrestation[] = [];
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
      id: null,
      nom: ['', Validators.required], 
      champs: [[], Validators.required],
      client: [null, Validators.required],
      // client: [null, Validators.required],
      tP: [null, Validators.required],

    });
  }

  ngOnInit(): void {
    this.loadChamps();  // Charger les champs disponibles
    this.loadModelFactures();
    this.loadClients();
    this.loadPrestations();
  }



  // Charger les champs
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
// charger clients 
  loadClients() {
    this.modelFactureService.getAllClient().subscribe(
      (clients: Client[]) => {
        this.clients = clients.map(client => ({
          id: client.id,
          nom: client.nom
        }));
      },
      (error) => {
        console.error('Erreur lors du chargement des clients :', error);
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les clients'});
      }
    );
  }

  loadPrestations() {
    this.modelFactureService.getAllPrestationforOther().subscribe((prestation: TypePrestation[]) => { 
      this.listPrestations = prestation;
    });
  }
// pop up to add
  openAddDialog() {
    this.isEditing = false;
    this.modelFactureForm.reset();  
    this.displayDialog = true;
  }
  // edit
  openEditDialog(model: ModelFacture) {
    this.isEditing = true;
    this.selectedModelFacture = model;
    this.modelFactureForm.patchValue(model);  
    this.displayDialog = true; 
  }

  // creation 
   onSubmit() {
    if (this.modelFactureForm.valid) {
      const modelData = this.modelFactureForm.value;
      
      console.log('Données envoyées au backend pour création:', modelData);

      if (modelData.champs.length === 0) {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez sélectionner au moins un champ' });
        return;
      }
      
      console.log('Avant création:', modelData);
      
      this.modelFactureService.createModelFacture(modelData).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Modèle créé avec succès' });
          this.loadModelFactures();
          this.displayDialog = false;
        },
        (error) => {
          console.error('Erreur lors de la création:', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la création du modèle' });
        }
      );
    }
   }
  
  // modif
  submitModif() {
    if (this.modelFactureForm.valid && this.selectedModelFacture) {
      const modelData = this.modelFactureForm.value;
      
      console.log('Données envoyées au backend pour modification:', modelData);

      if (modelData.champs.length === 0) {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez sélectionner au moins un champ' });
        return;
      }
      
      modelData.champs = modelData.champs.map((champ: any) => champ.id);
      
      if (this.selectedModelFacture.id) {
        modelData.id = this.selectedModelFacture.id;
      }
      
      console.log('Avant mise à jour:', modelData);
      
      this.modelFactureService.updateModelFacture(modelData).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Modèle mis à jour avec succès' });
          this.loadModelFactures();
          this.displayDialog = false;
        },
        (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour du modèle' });
        }
      );
    }
  }

  // Sélectionner un modèle pour modification
  editModelFacture(model: ModelFacture) {
    this.selectedModelFacture = model;
    this.modelFactureForm.patchValue(model); 
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
    this.displayDialog = false; 
  }
}
