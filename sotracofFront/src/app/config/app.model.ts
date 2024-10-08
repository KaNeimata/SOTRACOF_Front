export interface Client{
    id?: number;
    nom?: string;
    rccm?: string;
    iffu?: string;
    adresse?: string;
    boitePostal?: string;
    tel?: string;

}
export interface Reglement{

}
export interface Compte{

}
export interface Facture {
    id?: number;
    numero: string;
    sticker: string;
    tva: boolean;
    montantTva?: number;
    montantExonore?: number;
    montantNonExonore?: number;
    montantLettre: string;
    status: string;
    date: Date;
    client: Client;
    typePrestation: TypePrestation;
    signataire: Signataire;
    champs: FactureChamps[];
}

export interface FactureChamps {
    champId: number;
    nom: string;
    valeur: string;
}
export interface TypePrestation{
    id?: number;
    nom?: string;
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
export interface ModelFactureChamp {
    id?: number;
    modelFacture?: ModelFacture;
    champ?: Champs;
}

export interface ModelFacture {
    id?: number;
    nom?: string;
    champsList?: ModelFactureChamp[];
    client: Client;  
    typePrestation: TypePrestation;  
    facture: Facture;  
    reglesCalcul: RegleCalcul[]; 
}

export enum eTypeChamp {
    STRING = 'STRING',
    DOUBLE = 'DOUBLE',
    DATE = 'DATE'
}
export interface Champs {
    id?: number;
    nom?: string;
    type: eTypeChamp;
    valeurString?: string;
    valeurDouble?: number;
    valeurDate?: Date;
}

export interface RegleCalcul {
  id: number;
  description: string;
  valeur: number;
}
