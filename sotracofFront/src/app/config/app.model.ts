export interface Client{
    id?: number;
    nom?: string;
    rccm?: string;
    iffu?: string;
    adresse?: string;
    boitePostal?: string;
    tel?: string;

}
// export class LigneFacture{
//   id!:number;
//   champsListDate!:ChampsDate[];
//   champsListDouble!:ChampsDouble[];
//   champsListString!:ChampsString[];
//   regleCalcul!: RegleCalcul;
//   typePrestation!:TypePrestation;
//   client!:Client;
//   facture!:Facture;

// }

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
  ligneFacture!: ModelFacture [];

}
export interface TypePrestation{
    id?: number;
    nom?: string;
    // factureList?: Facture[];
    // ligneFactureList?: LigneFacture[];
}
export interface Signataire{
    id?: number;
    nom?: string;
    titre?: string;
    description?: string
}
export interface DivisionFiscale{
    id?:Number;
    nom?: string;
    sigle?: string
}
export class ChampsDate {
  id!: number;
  nom!:string;
  valeur!:Date;
  ligneFactureList!: ModelFacture[];
  

  }
  export class ChampsDouble {
    id!: number;
    nom!:string;
    valeur!:number;
    ligneFactureList!: ModelFacture[];

    }
    export class ChampsString {
      id!: number;
      nom!:string;
      valeur!:string;
      ligneFactureList!: ModelFacture[];

      }
export interface ModelFacture{
  id?: number;
  nom?: string;
  champsListDate?: ChampsDate[];
  champsListDouble?: ChampsDouble[];
  champsListString?: ChampsString[];
  
}