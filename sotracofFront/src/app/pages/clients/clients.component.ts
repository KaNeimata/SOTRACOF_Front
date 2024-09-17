import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/config/app.model';
import { AppServices } from 'src/app/config/app.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{

  clients: Array<Client> = [];
  selectedClient: Client;
  cltForm: FormGroup;
  displayDialog: boolean = false;
  editMode: boolean = false;

  constructor(private appService: AppServices, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.listClients();
    this.initForm();
  }
  listClients(){
    this.appService.getClients()
      .subscribe(
        res => {
          if (res.body) {
            this.clients = res.body;
            console.log('Success: donnee charger', this.clients);
          }
        }
    )
  }

  initForm(): void {
    this.cltForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      iffu: ['', [Validators.required, Validators.minLength(3)]],
      adresse: ['', [Validators.required, Validators.minLength(3)]],
      boitePostal: ['', [Validators.required, Validators.minLength(3)]],
      tel: ['', [Validators.required, Validators.minLength(3)]],
      rccm: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ajouterClient(): void{
    this.cltForm.reset();
    this.editMode = false;
    this.displayDialog = true;
  }

  editClient(client: Client): void {
  // Patcher le formulaire avec les données du client sélectionné
  this.cltForm.patchValue(client);
  
  // Si le client a un ID, nous sommes en mode modification
  this.editMode = !!client.id;
  
  // Afficher le dialogue
  this.displayDialog = true;
  
  // Stocker le client sélectionné
  this.selectedClient = client;
}

addClient() {
  if (this.cltForm.valid) {
    const clt = this.cltForm.value;
    if (this.editMode || clt.id != null) {
      this.appService.updateClient(clt.id).subscribe(
        (res) => {
          console.log('Client mis à jour avec succès');
          this.listClients();
        }
      );
    } else {
      this.appService.createClient(clt).subscribe(
        (res) => {
          if (res.body) {
            console.log('Client créé avec succès', res.body);
            this.listClients();
          } else {
            console.log('Aucune donnée renvoyée dans la réponse');
          }
        }
      );
    }
    this.displayDialog = false;
  } else {
    this.cltForm.markAllAsTouched();
  }
}


  deleteClient(clientId: number) {
    this.appService.deleteClient(clientId).subscribe(
      () => {
        this.listClients()
        console.log('suppression reussie');
      }
    );
  }

  
  cancel(): void {
    this.displayDialog = false;
  }

  get f() {
    return this.cltForm.controls;
  }
}

