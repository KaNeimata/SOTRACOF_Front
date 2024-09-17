import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Signataire } from 'src/app/config/app.model';
import { AppServices } from 'src/app/config/app.service';

@Component({
  selector: 'app-signataires',
  templateUrl: './signataires.component.html',
  styleUrls: ['./signataires.component.css']
})
export class SignatairesComponent implements OnInit {
  signataires: Signataire[];
  signataire: Signataire;
  formulaire: FormGroup;
  editMode: Boolean = false;
  popUp: Boolean;
  submitted: Boolean = false;
  
  constructor(private service: AppServices, private fb: FormBuilder,
    private messageService: MessageService,
    private confirmeService: ConfirmationService) { }

  ngOnInit(): void {
    // get liste
    this.service.getAllSignataire().subscribe(
      (response) => {
        this.signataires = response.body || [];
      })
  }

  initForm(): void {
    this.formulaire = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      titre: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  addSignataire() {
    this.signataire = {};
    this.editMode = false;
    this.popUp = true;
  }
  editSignataire(signataire: Signataire) {
    this.signataire = {};
    this.editMode = false;
    this.popUp = true;
    this.submitted = false
  }
  hideDialog() {
    this.popUp = false;
    this.submitted = false;
  }
  
  saveSignataire() {
    this.submitted = true;

    if (this.signataire.nom.trim()) {
      if (this.signataire.id) {
        this.signataires[this.findIndexById(this.signataire.id)] = this.signataire;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {
        // this.signataire.id = this.createId();
        // this.signataire.image = 'product-placeholder.svg';
        this.signataires.push(this.signataire);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.signataires = [...this.signataires];
      this.popUp = false;
      this.signataire = {};
    }
  }
    findIndexById(id: Number): number {
      let index = -1;
      for (let i = 0; i < this.signataires.length; i++) {
        if (this.signataires[i].id === id) {
          index = i;
          break;
        }
      }

      return index;
    }

    createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    }

  deleteSignataire(signataire: Signataire) {
        this.confirmeService.confirm({
            message: 'Are you sure you want to delete ' + signataire.nom + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.signataires = this.signataires.filter(val => val.id !== signataire.id);
                this.signataire = {};
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Supprime avec succes', life: 3000});
            }
        });
    }
}

