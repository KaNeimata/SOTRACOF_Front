import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Champs, eTypeChamp } from 'src/app/config/app.model';
import { AppServices } from 'src/app/config/app.service';
@Component({
  selector: 'app-intitules',
  templateUrl: './intitules.component.html',
  styleUrls: ['./intitules.component.css']
})
export class IntitulesComponent implements OnInit {


  champsForm: FormGroup;
  champsList: Champs[] = [];
  selectedChamp: Champs | null = null;
  displayAddDialog: boolean = false;  // pop up dajout
  displayEditDialog: boolean = false; 

  typeOptions = [
    { label: ' Texte', value: eTypeChamp.STRING },
    { label: ' Nombre', value: eTypeChamp.DOUBLE },
    { label: ' Date', value: eTypeChamp.DATE }
  ];


  constructor(
    private fb: FormBuilder,
    private champsService: AppServices,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.loadChamps();

  }
  // chargement
  loadChamps() {
    this.champsService.getAllChamps().subscribe(
      (champs) => {
        this.champsList = champs;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors du chargement des champs' });
      }
    );
  }
  initForm() {
    this.champsForm = this.fb.group({
      id:null,
      nom: ['', Validators.required],
      type: [null, Validators.required],
    })
  }

  openAddDialog() {
  this.champsForm.reset();
  this.displayAddDialog = true;
  }
  
  // creation
  onSubmit() {
    if (this.champsForm.valid) {
      const champsData = this.champsForm.value;
      console.log('Formulaire soumis avec les données:', champsData);

      this.champsService.createChamps(champsData).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Champ cree avec succès' });
          this.loadChamps();
          this.resetForm();
          this.displayAddDialog = false;  
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la creation du champ' });
        }
      );
    }
  }
// modif 
onSubmitModif() {
  if (this.champsForm.valid) {
    const champsData = this.champsForm.value;
    console.log('Formulaire soumis avec les données:', champsData);

    if (champsData.id !== null && champsData.id !== undefined) {
      console.log('ID du champ trouvé:', champsData.id);
      this.champsService.updateChamps(champsData).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Champ mis à jour avec succès' });
          this.loadChamps(); 
          this.resetForm();
          this.displayEditDialog = false; 
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour du champ' });
        }
      );
    } else {
      console.error('ID manquant:', champsData);
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Le champ sélectionné est incorrect' });
    }
  }
}

// recuperation des doneees du champs selectionnes
  editChamps(champ: Champs) {
  this.selectedChamp = champ;
  this.champsForm.patchValue({
    id: champ.id,
    nom: champ.nom,
    type: champ.type,
  });
  console.log('Formulaire après patchValue:', this.champsForm.value);
    this.displayEditDialog = true;
  console.log(this.champsForm.value);  // Pour vérifier les données avant la mise à jour
  }
   // Supprimer un champ
  deleteChamps(id: number) {
    this.champsService.deleteChamps(id).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Champ supprimé avec succès' });
        this.loadChamps();
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression du champ' });
      }
    );
  }
  // Réinitialiser le formulaire
  resetForm() {
    this.champsForm.reset();
    this.selectedChamp = null;
    this.displayEditDialog = false;

  }
}