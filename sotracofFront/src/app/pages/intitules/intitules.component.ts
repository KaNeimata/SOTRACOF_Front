import { Component, OnInit } from '@angular/core';
import { ChampsDate } from 'src/app/config/app.model';
import { ChampsDouble } from 'src/app/config/app.model';
import { ChampsString } from 'src/app/config/app.model';
import { ParametreService } from 'src/app/parametre.service';
@Component({
  selector: 'app-intitules',
  templateUrl: './intitules.component.html',
  styleUrls: ['./intitules.component.css']
})
export class IntitulesComponent implements OnInit{

  champsDateArray: any[] = [];
  champsDoubleArray: any[] = [];
  champsStringArray: any[] = [];
  champsDate= new ChampsDate();
  champsDouble =new ChampsDouble();
  champsString= new ChampsString();
  constructor( private parametreService: ParametreService){}
  ngOnInit(): void {

 this.chargerListChampsDate();
 this.chargerListChampsDouble();
 this.chargerListChampsString();
  }


//chager listes des champs
  chargerListChampsDate() {
    this.parametreService.listeChampsDate().subscribe((prods: any) => {
      this.champsDateArray = prods;
      console.log(this.champsDateArray);
     // this.searchArray=prods;
       });
  }

  chargerListChampsDouble() {
    this.parametreService.listeChampsDouble().subscribe((prods: any) => {
      this.champsDoubleArray = prods;
      // this.searchArray=prods;
       });
  }

  chargerListChampsString() {
    this.parametreService.listeChampsString().subscribe((prods: any) => {
      this.champsStringArray = prods;
        // this.searchArray=prods;
       });
  }


  //Gestion Modal pop up date

  isPopupOpen = false;


  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  submitForm() {
    // console.log('Formulaire soumis :', this.formData);
    this.parametreService.addChampsDate(this.champsDate).subscribe(vir=>{
      this.chargerListChampsDate();

    })
    this.closePopup();
  }

  deleteChampDate(p:ChampsDate){
    this.parametreService.supprimerChampsDate(p.id).subscribe(()=>{
      this.chargerListChampsDate();
    });

  }
  //Gestion modal pop up double
  isPopupOpenD = false;


  openPopupD() {
    this.isPopupOpenD = true;
  }

  closePopupD() {
    this.isPopupOpenD = false;
  }

  submitFormD() {
    // console.log('Formulaire soumis :', this.formData);
    this.parametreService.addChampsDouble(this.champsDouble).subscribe(vir=>{
      this.chargerListChampsDouble();

    })
    this.closePopupD();
  }

  deleteChampDouble(p:ChampsDouble){
    this.parametreService.supprimerChampsDouble(p.id).subscribe(()=>{
      this.chargerListChampsDouble();
    });

  }
  //Gestion pop up String

  isPopupOpenS = false;


  openPopupS() {
    this.isPopupOpenS = true;
  }

  closePopupS() {
    this.isPopupOpenS = false;
  }

  submitFormS() {
    // console.log('Formulaire soumis :', this.formData);
    this.parametreService.addChampsString(this.champsString).subscribe(vir=>{
      this.chargerListChampsString();
    })
    this.closePopupS();
  }

  deleteChampString(p:ChampsString){
    this.parametreService.supprimerChampsString(p.id).subscribe(()=>{
      this.chargerListChampsString();
    });

  }

}
