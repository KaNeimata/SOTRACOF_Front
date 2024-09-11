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
export interface LigneFacture{

}
export interface Reglement{
    
}
export interface Compte{
    
}
export interface Facture{
    
}
export interface TypePrestation{
    id?: Number;
    nom?: String;
    // factureList?: Facture[];
    // ligneFactureList?: LigneFacture[];
}