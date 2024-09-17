export interface Client{
    id?: number;
    nom?: string;
    rccm?: string;
    iffu?: string;
    adresse?: string;
    boitePostal?: string;
    tel?: string;

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