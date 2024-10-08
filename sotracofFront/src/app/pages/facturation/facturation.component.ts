import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Champs, Client, Facture, FactureChamps, Signataire, TypePrestation } from 'src/app/config/app.model';
import { AppServices } from 'src/app/config/app.service';

@Component({
  selector: 'app-facturation',
  templateUrl: './facturation.component.html',
  styleUrls: ['./facturation.component.css']
})
export class FacturationComponent implements OnInit {

//   factures: Facture[] = [];
//   selectedFacture: Facture = this.createEmptyFacture();
//   factureDialog: boolean = false;
//   // champs: Champs[]

//   constructor(private factureService: AppServices) { }

//   ngOnInit(): void {
//     this.loadFactures();
//   }

//   loadFactures() {
//     this.factureService.getAllFactures().subscribe(response => {
//       this.factures = response.body || [];
//     });
//   }

//   createEmptyFacture(): Facture {
//     return {
//       numero: '',
//       sticker: '',
//       tva: true,
//       montantLettre: '',
//       date: new Date(),
//       status: '',
//       clientId: 0,
//       typePrestationId: 0,
//       champs: []  // Champs dynamiques initialement vides
//     };
//   }

//   openAddDialog() {
//     this.selectedFacture = this.createEmptyFacture();
//     this.factureDialog = true;
//   }

//   openEditDialog(facture: Facture) {
//     this.selectedFacture = { ...facture }; // Cloner l'objet facture pour l'édition
//     this.factureDialog = true;
//   }
//   formatDate(input: any): string {
//   const date = new Date(input);  // Conversion en objet Date

//   // Vérifie si l'objet est bien une date valide
//   if (isNaN(date.getTime())) {
//     throw new Error('Invalid date format');
//   }

//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// }


//   saveFacture() {
//     if (this.selectedFacture.id) {
//       this.factureService.updateFacture(this.selectedFacture).subscribe(() => {
//         this.loadFactures();
//         this.factureDialog = false;
//       });
//     } else {
//       this.factureService.createFacture(this.selectedFacture).subscribe(() => {
//         this.loadFactures();
//         this.factureDialog = false;
//       });
//     }
//   }

//   deleteFacture(id: number) {
//     this.factureService.deleteFacture(id).subscribe(() => {
//       this.loadFactures();
//     });
//   }

//   hideDialog() {
//     this.factureDialog = false;
//   }
  factures: Facture[] = [];
  clients: Client[] = [];
  typePrestations: TypePrestation[] = [];
  signataires: Signataire[] = [];
  selectedFacture: Facture;
  factureDialog: boolean = false;

  constructor(
    private factureService: AppServices,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadFactures();
    this.loadClients();
    this.loadTypePrestations();
    // this.loadSignataires();
  }

  loadFactures() {
    this.factureService.getAllFactures().subscribe(
      (field) => {
        this.factures = field;
      },
      (error) => this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Impossible de charger les factures'})
    );
  }

  loadClients() {
    this.factureService.getAllClient().subscribe({
      next: (clients) => this.clients = clients,
      error: (error) => this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Impossible de charger les clients'})
    });
  }

  loadTypePrestations() {
    this.factureService.getAllPrestationforOther().subscribe({
      next: (typePrestations) => this.typePrestations = typePrestations,
      error: (error) => this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Impossible de charger les types de prestation'})
    });
  }

  // loadSignataires() {
  //   this.factureService.getAllSignataires().subscribe({
  //     next: (signataires) => this.signataires = signataires,
  //     error: (error) => this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Impossible de charger les signataires'})
  //   });
  // }

  createEmptyFacture(): Facture {
    return {
      numero: '',
      sticker: '',
      tva: true,
      montantLettre: '',
      date: new Date(),
      status: '',
      client: null,
      typePrestation: null,
      signataire: null,
      champs: []
    };
  }

  openAddDialog() {
    this.selectedFacture = this.createEmptyFacture();
    this.factureDialog = true;
  }

  openEditDialog(facture: Facture) {
    this.selectedFacture = { ...facture };
    this.factureDialog = true;
  }

  saveFacture() {
    if (this.selectedFacture.id) {
      this.factureService.updateFacture(this.selectedFacture).subscribe({
        next: () => {
          this.loadFactures();
          this.factureDialog = false;
          this.messageService.add({severity:'success', summary: 'Succès', detail: 'Facture mise à jour'});
        },
        error: (error) => this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Impossible de mettre à jour la facture'})
      });
    } else {
      this.factureService.createFacture(this.selectedFacture).subscribe({
        next: () => {
          this.loadFactures();
          this.factureDialog = false;
          this.messageService.add({severity:'success', summary: 'Succès', detail: 'Facture créée'});
        },
        error: (error) => this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Impossible de créer la facture'})
      });
    }
  }

  deleteFacture(id: number) {
    this.factureService.deleteFacture(id).subscribe({
      next: () => {
        this.loadFactures();
        this.messageService.add({severity:'success', summary: 'Succès', detail: 'Facture supprimée'});
      },
      error: (error) => this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Impossible de supprimer la facture'})
    });
  }

  hideDialog() {
    this.factureDialog = false;
  }

  onClientChange() {
    // Logique pour charger les champs du modèle de facture correspondant au client et au type de prestation sélectionnés
    if (this.selectedFacture.client && this.selectedFacture.typePrestation) {
      this.factureService.getAllModelFacture(this.selectedFacture.client.id, this.selectedFacture.typePrestation.id).subscribe(
         (modelFacture) => {
        // Accède aux champs dynamiques via ModelFactureChamps
        this.selectedFacture.champs = modelFacture.champsList.map(mfChamp => {
          return { champId: mfChamp.champ.id, nom: '', valeur: '' };  // Initialisation des valeurs
        });
      },
        (error) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger le modèle de facture' })
      );
    }
  }
}

