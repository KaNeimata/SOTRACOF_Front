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
      ligneFactureList: ['', [Validators.required, Validators.minLength(3)]],
      reglementList: ['', [Validators.required, Validators.minLength(3)]],
      compteList: ['', [Validators.required, Validators.minLength(3)]],
      factureList: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ajouterClient(): void{
    this.cltForm.reset();
    this.editMode = false;
    this.displayDialog = true;
  }

  editClient(client: Client): void {
    this.cltForm.patchValue(client);
    this.editMode = true;
    this.displayDialog = true;
    this.selectedClient = client;
  }
  addClient(clt: Client) {
    if (clt.id == null) {
      this.appService.createClient(this.selectedClient).subscribe(
      (res) => {
         if (res.body) {
          console.log('Client créé avec succès', res.body);
      } else {
          console.log('Aucune donnée renvoyée dans la réponse');
      }
        }
    );
    } else {
      this.appService.updateClient(clt.id, clt).subscribe(
        (res) => {
          console.log('Client MAJ reussie')
        }
        
      )
    }
  }

  deleteClient(clientId: number) {
    this.appService.deleteClient(clientId).subscribe(
      (Response) => {
        console.log('suppression reussie');
      },
      (Error) => {
        console.error('echec', Error);
      }
    );
  }
}

