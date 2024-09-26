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

  // champsDateArray: any[] = [];
  // champsDoubleArray: any[] = [];
  // champsStringArray: any[] = [];
  // champsDate= new ChampsDate();
  // champsDouble =new ChampsDouble();
  // champsString= new ChampsString();

  champsForm: FormGroup;
  champsList: Champs[] = [];
  // public champ: Champs[] = {};
  selectedChamp: Champs | null = null;

  typeOptions = [
    { label: 'Texte', value: eTypeChamp.STRING },
    { label: 'Nombre', value: eTypeChamp.DOUBLE },
    { label: 'Date', value: eTypeChamp.DATE }
  ];
;

  constructor(private parametreService: ParametreService,
    private fb: FormBuilder,
    private champsService: AppServices,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {

    //  this.chargerListChamps();
    
    this.initForm();
    this.loadChamps();

    // Gestion dynamique des valeurs
    // this.champsForm.get('type')?.valueChanges.subscribe(type => {
    //   this.resetValues();
    //   if (type === eTypeChamp.STRING) {
    //     this.champsForm.get('valeurString')?.setValidators(Validators.required);
    //   } else if (type === eTypeChamp.DOUBLE) {
    //     this.champsForm.get('valeurDouble')?.setValidators(Validators.required);
    //   } else if (type === eTypeChamp.DATE) {
    //     this.champsForm.get('valeurDate')?.setValidators(Validators.required);
    //   }
    //   this.champsForm.updateValueAndValidity();
    // });

    // chargerListChamps(): any {
    //   this.parametreService.listeChampsDate().subscribe((prods: any) => {
    //     this.champsDateArray = prods;
    //     console.log(this.champsDateArray);
    //      });

    //   this.parametreService.listeChampsDouble().subscribe((prods: any) => {
    //     this.champsDoubleArray = prods;
    //     console.log(this.champsDoubleArray);
    //   });
    
    //   this.parametreService.listeChampsString().subscribe((prods: any) => {
    //     this.champsStringArray = prods;
    //     console.log(this.champsStringArray);
    //      });
    // }

    // isPopupOpen = false;


    // openPopup() {
    //   this.isPopupOpen = true;
    // }

    // closePopup() {
    //   this.isPopupOpen = false;
    // }

    // submitForm() {
    //   this.parametreService.addChampsDate(this.champsDate).subscribe(vir=>{
    //     this.chargerListChamps();

    //   })
    //   this.closePopup();
    // }

    // deleteChampDate(p:ChampsDate){
    //   this.parametreService.supprimerChampsDate(p.id).subscribe(()=>{
    //     this.chargerListChamps();
    //   });

    // }
    // isPopupOpenD = false;


    // openPopupD() {
    //   this.isPopupOpenD = true;
    // }

    // closePopupD() {
    //   this.isPopupOpenD = false;
    // }

    // submitFormD() {
    //   this.parametreService.addChampsDouble(this.champsDouble).subscribe(vir=>{
    //     this.chargerListChamps();

    //   })
    //   this.closePopupD();
    // }

    // deleteChampDouble(p:ChampsDouble){
    //   this.parametreService.supprimerChampsDouble(p.id).subscribe(()=>{
    //     this.chargerListChamps();
    //   });

    // }

    // isPopupOpenS = false;


    // openPopupS() {
    //   this.isPopupOpenS = true;
    // }

    // closePopupS() {
    //   this.isPopupOpenS = false;
    // }

    // submitFormS() {
    //   this.parametreService.addChampsString(this.champsString).subscribe(vir=>{
    //     this.chargerListChamps();
    //   })
    //   this.closePopupS();
    // }

    // deleteChampString(p:ChampsString){
    //   this.parametreService.supprimerChampsString(p.id).subscribe(()=>{
    //     this.chargerListChamps();
    //   });

    // }

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
  // resetValues() {
  //   this.champsForm.patchValue({
  //     valeurString: '',
  //     valeurDouble: null,
  //     valeurDate: null
  //   });
  //   this.champsForm.get('valeurString')?.clearValidators();
  //   this.champsForm.get('valeurDouble')?.clearValidators();
  //   this.champsForm.get('valeurDate')?.clearValidators();

  //   throw new Error('Method not implemented.');
  // }

   onSubmit() {
    if (this.champsForm.valid) {
      const champsData = this.champsForm.value;
      if (champsData.id) {
        // Mettre à jour le champ existant
        this.updateChamps(champsData);
      } else {
        // Créer un nouveau champ
        this.champsService.createChamps(champsData).subscribe(
          (response) => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Champ ajouté avec succès' });
            this.loadChamps();  // Recharger la liste des champs après ajout
            this.resetForm();
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de l\'ajout du champ' });
          }
        );
      }
    }
   }
  
  editChamps(champ: Champs) {
  this.selectedChamp = champ;
  this.champsForm.patchValue(champ);
  console.log(this.champsForm.value);  // Pour vérifier les données avant la mise à jour
}

  // Mettre à jour un champ
  updateChamps(champsData: Champs) {
  console.log(champsData);  // Vérifiez si le champ 'id' est bien présent
  this.champsService.updateChamps(champsData).subscribe(
    (response) => {
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Champ mis à jour avec succès' });
      this.loadChamps();
      this.resetForm();
    },
    (error) => {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour du champ' });
    }
  );
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

//   cancel(): void {
//       this.champsForm.reset();
// }
  // Réinitialiser le formulaire
  resetForm() {
    this.champsForm.reset();
    this.selectedChamp = null;
  }
}