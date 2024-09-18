export interface Client{
    id?: Number;
    nom?: String;
    rccm?: String;
    iffu?: String;
    adresse?: String;
    boitePostal?: String;
    tel?: String;
    ligneFactureList?: LigneFacture[];
    reglementList?: Reglement[];
    compteList?: Compte[];
    factureList?: Facture[];

}
export class LigneFacture{
  id!:number;
  champsListDate!:ChampsDate[];
  champsListDouble!:ChampsDouble[];
  champsListString!:ChampsString[];
  regleCalcul!: RegleCalcul;
  typePrestation!:TypePrestation;
  client!:Client;
  facture!:Facture;

}

export interface Reglement{

}
export interface Compte{

}
export interface Facture{

}
export class RegleCalcul{
  id!:number;
  nom!:string;
  FormeCalcule!:string;
  ligneFacture!:LigneFacture;

}
export interface TypePrestation{
    id?: Number;
    nom?: String;
    factureList?: Facture[];
    ligneFactureList?: LigneFacture[];
}
export class ChampsDate {
  id!: number;
  nom!:string;
  valeur!:Date;
  ligneFactureList!: LigneFacture[];

  }
  export class ChampsDouble {
    id!: number;
    nom!:string;
    valeur!:number;
    ligneFactureList!: LigneFacture[];

    }
    export class ChampsString {
      id!: number;
      nom!:string;
      valeur!:string;
      ligneFactureList!: LigneFacture[];

      }


