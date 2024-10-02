import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RegleCalcul } from 'src/app/config/app.model';
import { AppServices } from 'src/app/config/app.service';

@Component({
  selector: 'app-regle-calcul',
  templateUrl: './regle-calcul.component.html',
  styleUrls: ['./regle-calcul.component.css']
})
export class RegleCalculComponent implements OnInit {

  regleCalculForm: FormGroup;
  reglesCalcul: RegleCalcul[] = [];  // Liste des règles de calcul disponibles
  selectedRegle: RegleCalcul | null = null;  // Règle de calcul sélectionnée pour modification
  displayDialog: boolean = false;  // Contrôle l'affichage du p-dialog
  isEditMode: boolean = false;  // Détermine si on est en mode création ou modification

  constructor(
    private fb: FormBuilder,
    private regleCalculService: AppServices,
    private messageService: MessageService
  ) {
    this.regleCalculForm = this.fb.group({
      id: [null],  // ID de la règle (null pour une nouvelle création)
      nom: ['', Validators.required],  // Nom de la règle de calcul
      formule: ['', Validators.required],  // Formule associée à la règle
      type: ['', Validators.required],
       modelFacture: [null, Validators.required]  // Modèle de facture associé
    });
  }

  ngOnInit(): void {
    this.loadReglesCalcul();  // Charger les règles de calcul existantes
  }

  // Charger les règles de calcul disponibles
  loadReglesCalcul() {
    this.regleCalculService.getAllRC().subscribe((regles: RegleCalcul[]) => {
      this.reglesCalcul = regles;
    });
  }

  // Ouvrir le dialog pour la création
  openCreateDialog() {
    this.isEditMode = false;  // On est en mode création
    this.resetForm();  // Réinitialiser le formulaire
    this.displayDialog = true;  // Afficher le p-dialog
  }

  // Ouvrir le dialog pour la modification
  openEditDialog(regle: RegleCalcul) {
    this.isEditMode = true;  // On est en mode modification
    this.selectedRegle = regle;  // Sélectionner la règle pour modification
    this.regleCalculForm.patchValue(regle);  // Remplir le formulaire avec les données de la règle sélectionnée
    this.displayDialog = true;  // Afficher le p-dialog
  }

  // Soumettre le formulaire pour créer une nouvelle règle
  submit() {
    if (this.regleCalculForm.valid) {
      const regleData = this.regleCalculForm.value;

      this.regleCalculService.createRC(regleData).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Règle créée avec succès' });
          this.loadReglesCalcul();  // Recharger la liste des règles
          this.displayDialog = false;  // Fermer le p-dialog
          this.resetForm();  // Réinitialiser le formulaire
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la création de la règle' });
        }
      );
    }
  }

  // Soumettre le formulaire pour modifier une règle existante
  submitModif() {
    if (this.regleCalculForm.valid) {
      const regleData = this.regleCalculForm.value;

      this.regleCalculService.updateRC(regleData).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Règle mise à jour avec succès' });
          this.loadReglesCalcul();  // Recharger la liste des règles
          this.displayDialog = false;  // Fermer le p-dialog
          this.resetForm();  // Réinitialiser le formulaire
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour de la règle' });
        }
      );
    }
  }

  // Supprimer une règle de calcul
  deleteRegleCalcul(id: number) {
    this.regleCalculService.deleteRC(id).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Règle supprimée avec succès' });
        this.loadReglesCalcul();  // Recharger la liste des règles
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression de la règle' });
      }
    );
  }

  // Réinitialiser le formulaire
  resetForm() {
    this.selectedRegle = null;
    this.regleCalculForm.reset();
  }

  // Fermer le dialog
  closeDialog() {
    this.displayDialog = false;
    this.resetForm();
    }
  }
