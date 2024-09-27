import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Champs, ChampsDate, eTypeChamp } from 'src/app/config/app.model';
import { ChampsDouble } from 'src/app/config/app.model';
import { ChampsString } from 'src/app/config/app.model';
import { AppServices } from 'src/app/config/app.service';
import { ParametreService } from 'src/app/parametre.service';
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
    { label: 'Texte', value: eTypeChamp.STRING },
    { label: 'Nombre', value: eTypeChamp.DOUBLE },
    { label: 'Date', value: eTypeChamp.DATE }
  ];


  constructor(private parametreService: ParametreService,
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
      nom: ['', Validators.required],
      type: [null, Validators.required],
    })
  }

  openAddDialog() {
  this.champsForm.reset();
  this.displayAddDialog = true;
  }
  
  //  onSubmit() {
  //   if (this.champsForm.valid) {
  //     const champsData = this.champsForm.value;
  //     console.log('Données envoyées au backend:', champsData);
  //       this.champsService.createChamps(champsData).subscribe(
  //         (response) => {
  //           this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Champ ajouté avec succès' });
  //           this.loadChamps();  // Recharger la liste des champs après ajout
  //           this.resetForm();
  //           this.displayAddDialog = false;
  //         },
  //         (error) => {
  //           this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de l\'ajout du champ' });
  //         }
  //       );
  //   }
  //  }
  
  // onSubmitModif() {
  //   if (this.champsForm.valid) {
  //     const champsData = this.champsForm.value;
  //     console.log('Données envoyées au backend:', champsData);
  //       this.champsService.updateChamps(champsData).subscribe(
  //         (response) => {
  //           this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Champ mis à jour avec succès' });
  //           this.loadChamps();  // Recharger la liste des champs après ajout
  //           this.resetForm();
  //           this.displayEditDialog = false;
  //         },
  //             (error) => {
  //     this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour du champ' });
  //   });
  //   }
  //  }
  
onSubmitModif() {
  if (this.champsForm.valid) {
    const champsData = this.champsForm.value;
    console.log('Formulaire soumis avec les données:', champsData);  // Inspecte le contenu du formulaire

    if (champsData.id) {
      console.log('ID du champ trouvé:', champsData.id);  // Affiche l'ID pour confirmation
      this.champsService.updateChamps(champsData).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Champ mis à jour avec succès' });
          this.loadChamps();  // Recharger la liste des champs après la mise à jour
          this.resetForm();
          this.displayEditDialog = false;  // Fermer le dialogue de modification
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour du champ' });
        }
      );
    } else {
      console.error('ID manquant:', champsData);  // Log plus détaillé si l'ID est manquant
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Le champ sélectionné est incorrect' });
    }
  }
}


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