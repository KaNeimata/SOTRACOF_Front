import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/config/app.model';
import { AppServices } from 'src/app/config/app.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{

  clients: Array<Client> = [];
  client: Client = { };

  constructor(private appService: AppServices) {
  }
  ngOnInit(): void {
    this.listClients();
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
  addClient(clt: Client) {
    if (clt.id == null) {
      this.appService.createClient(this.client).subscribe(
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

