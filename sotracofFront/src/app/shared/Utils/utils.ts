import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SelectItem} from 'primeng/api';
// import {PointVente, ReportingInput} from './app.models';
// import * as XLSX from 'xlsx';
// import {utils, WorkBook, WorkSheet} from 'xlsx';
import {map} from 'rxjs';

export const createRequestOption = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
    if (req) {
        Object.keys(req).forEach(key => {
            if (key !== 'sort' && key !== 'type' &&
                req[key] !== null && req[key] !== undefined) {
                options = options.set(key, req[key]);
            }
        });
        if (req.sort) {
            req.sort.forEach((val: string | number | boolean) => {
                options = options.append('sort', val);
            });
        }
    }
    return options;
};

// Convert bytes array and print resulting pdf file in a new tab from the browser.
// export function printPdfFile(bytes) {
//     window.open(URL.createObjectURL(new Blob([bytes], {type: 'application/pdf'})), '_blank');
// }

// export function printExcelFile(bytes) {
//     const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
//     window.open(URL.createObjectURL(new Blob([bytes], {type: contentType})), '_blank');
// }

export function printWordFile(bytes: any) {
    const contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    window.open(URL.createObjectURL(new Blob([bytes], {type: contentType})), '_blank');
}

/**
 * Générer une chaine de caractères aléatoires.
 * @param length
 */
// export function randomString(length) {
//     let result = '';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }


/**
 * Service pour gerer le telechargement ou l'impression de fichiers.
 */
@Injectable({providedIn: 'root'})
export class FileHandlerService {
    constructor(protected http: HttpClient) {
    }

    /**
     * Method to download file
     * @param {?} contentType
     * @param {?} data
     * @param {?} fileName
     * @return {?}
     */
    // downloadBinaryFile(contentType, data, fileName) {
    //     /** @type {?} */
    //     const byteCharacters = atob(data);
    //     /** @type {?} */
    //     const byteNumbers = new Array(byteCharacters.length);
    //     for (let i = 0; i < byteCharacters.length; i++) {
    //         byteNumbers[i] = byteCharacters.charCodeAt(i);
    //     }
    //     /** @type {?} */
    //     const byteArray = new Uint8Array(byteNumbers);
    //     /** @type {?} */
    //     const blob = new Blob([byteArray], {
    //         type: contentType
    //     });
        /** @type {?} */
        // const tempLink = document.createElement('a');
        // tempLink.href = window.URL.createObjectURL(blob);
        // tempLink.download = fileName;
        // tempLink.target = '_blank';
        // tempLink.click();
    }

    // downloadPlainTextFile(contentType, bytes, fileName = randomString(12)) {
    //     const tempLink = document.createElement('a');
    //     tempLink.href = window.URL.createObjectURL(new Blob([bytes], {type: contentType}));
    //     tempLink.download = fileName;
    //     tempLink.target = '_blank';
    //     tempLink.click();
    // }


    /**
     * Method to abbreviate the text given.
     * @param {?} text
     * @param {?=} append
     * @return {?}
     */
    // abbreviate(text, append = '...') {
    //     if (text.length < 30) {
    //         return text;
    //     }
    //     return text ? (text.substring(0, 15) + append + text.slice(-10)) : '';
    // }

    /**
     * Method to find the byte size of the string provides
     * @param {?} base64String
     * @return {?}
     */
    // byteSize(base64String) {
    //     return this.formatAsBytes(this.size(base64String));
    // }

    /**
     * Method to convert the file to base64
     * @param {?} file
     * @param {?} cb
     * @return {?}
     */
    // toBase64(file, cb) {
    //     /** @type {?} */
    //     const fileReader = new FileReader();
    //     fileReader.onload = (e) => {
    //         const targetInString = fileReader.result.toString();
    //         /** @type {?} */
    //         const base64Data = targetInString.substr(targetInString.indexOf('base64,') + 'base64,'.length);
    //         cb(base64Data);
    //     };
    //     fileReader.readAsDataURL(file);
    // }

    /**
     * Method to clear the input
     * @param {?} entity
     * @param {?} elementRef
     * @param {?} field
     * @param {?} fieldContentType
     * @param {?} idInput
     * @return {?}
     */
    // clearInputImage(entity, elementRef, field, fieldContentType, idInput) {
    //     if (entity && field && fieldContentType) {
    //         if (entity.hasOwnProperty(field)) {
    //             entity[field] = null;
    //         }
    //         if (entity.hasOwnProperty(fieldContentType)) {
    //             entity[fieldContentType] = null;
    //         }
    //         if (elementRef && idInput && elementRef.nativeElement.querySelector('#' + idInput)) {
    //             elementRef.nativeElement.querySelector('#' + idInput).value = null;
    //         }
    //     }
    // }

    /**
     * @private
     * @param {?} suffix
     * @param {?} str
     * @return {?}
     */
    // endsWith(suffix, str) {
    //     return str.indexOf(suffix, str.length - suffix.length) !== -1;
    // }

    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    // paddingSize(value) {
    //     if (this.endsWith('==', value)) {
    //         return 2;
    //     }
    //     if (this.endsWith('=', value)) {
    //         return 1;
    //     }
    //     return 0;
    // }

    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    // size(value) {
    //     return value.length / 4 * 3 - this.paddingSize(value);
    // }

    // /**
    //  * @private
    //  * @param {?} size
    //  * @return {?}
    //  */
    // formatAsBytes(size) {
    //     return size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' bytes';
    // }

    /**
     * Sets the base 64 data & file type of the 1st file on the event (event.target.files[0]) in the passed entity object
     * and returns a promise.
     *
     * @param {?} event the object containing the file (at event.target.files[0])
     * @param {?} entity the object to set the file's 'base 64 data' and 'file type' on
     * @param {?} field the field name to set the file's 'base 64 data' on
     * @param {?} isImage boolean representing if the file represented by the event is an image
     * @return {?} a promise that resolves to the modified entity if operation is successful, otherwise rejects with an error message
     */
    // setFileData(event, entity, field, isImage) {
    //     return new Promise((resolve, reject) => {
    //         if (event && event.target && event.target.files && event.target.files[0]) {
    //             /** @type {?} */
    //             const file = event.target.files[0];
    //             if (isImage && !/^image\//.test(file.type)) {
    //                 reject(`File was expected to be an image but was found to be ${file.type}`);
    //             } else {
    //                 this.toBase64(file, (base64Data) => {
    //                     entity[field] = base64Data;
    //                     entity[`${field}ContentType`] = file.type;
    //                     resolve(entity);
    //                 });
    //             }
    //         } else {
    //             reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
    //         }
    //     });
    // }

// }

/**
 * Deep copy an objet.
 * @param obj
 */
// export function deepCopy(obj) {
//     let copy;

//     // Handle the 3 simple types, and null or undefined
//     if (null == obj || 'object' !== typeof obj) {
//         return obj;
//     }

//     // Handle Date
//     if (obj instanceof Date) {
//         copy = new Date();
//         copy.setTime(obj.getTime());
//         return copy;
//     }

//     // Handle Array
//     if (obj instanceof Array) {
//         copy = [];
//         for (let i = 0, len = obj.length; i < len; i++) {
//             copy[i] = deepCopy(obj[i]);
//         }
//         return copy;
//     }

//     // Handle Object
//     if (obj instanceof Object) {
//         copy = {};
//         for (const attr in obj) {
//             if (obj.hasOwnProperty(attr)) {
//                 copy[attr] = deepCopy(obj[attr]);
//             }
//         }
//         return copy;
//     }

//     throw new Error('Unable to copy obj! Its type isn\'t supported.');
// }

// export function isUserInRoles(roles: string[], user: User): any {
//     if (user) {
//         return roles.some(value =>
//             user.profil.authorities.map(role => role.name).includes(value));
//     }
// }

// Customize primeng p-calendar
export function initLocalDate(): any {
    return {
        firstDayOfWeek: 1,
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout',
            'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Aujourd\'hui',
        clear: 'Clear',
        dateFormat: 'dd/mm/yy',
        weekHeader: 'Wk'
    };
}

// export function generateReportFile(bytes: any, reporting?: ReportingInput) {
//     if (reporting) {
//         const report = {...reporting};
//         report.page = 1;
//         switch (report.reportFormat) {
//             case ReportFormat.PDF:
//                 window.open(URL.createObjectURL(new Blob([bytes], {type: 'application/pdf'})), '_blank');
//                 break;
//             case ReportFormat.EXCEL:
//                 printExcelFile(bytes);
//                 break;
//             case ReportFormat.WORD:
//                 printWordFile(bytes);
//                 break;
//             case ReportFormat.CSV:
//                 printExcelFile(bytes);
//                 break;
//             default:
//                 window.console.log('Aucun format de fichier précisé');
//                 break;
//         }
//     } else {
//         printPdfFile(bytes);
//     }
// }

export enum TypeStatut {
    INACTIF = 'INACTIF', ACTIF = 'ACTIF', ANNULER = 'ANNULER'
}

export const typeStatutList: SelectItem[] = Object.keys(TypeStatut)
    .map(tc => ({label: tc, value: tc}));

export const TYPESTATUS_LIST: SelectItem[] = [
    {value: TypeStatut.ACTIF, label: 'ACTIF'},
    {value: TypeStatut.ANNULER, label: 'ANNULER'},
];

export enum ReportFormat {
    PDF = 'PDF', WORD = 'WORD', EXCEL = 'EXCEL', CSV = 'CSV', XPRINT = 'XPRINT'
}

// export enum EReportType {
//     DUMMY = 'DUMMY',
//     COMMANDE = 'COMMANDE',
//     VENTE = 'VENTE',
//     LIVRAISON = 'LIVRAISON',
//     RECOUVREMENT_LIVRAISON = 'RECOUVREMENT_LIVRAISON',
//     RECOUVREMENT_VENTE = 'RECOUVREMENT_VENTE',
//     TRANSFERT_PRODUIT = 'TRANSFERT_PRODUIT',
//     INVENTAIRE = 'INVENTAIRE',
//     FICHE_INVENTAIRE = 'FICHE_INVENTAIRE',
//     ETAT_REMBOURSEMENT = 'ETAT_REMBOURSEMENT',
//     LIST_PRODUIT = 'LIST_PRODUIT',
//     LIST_CREDIT = 'LIST_CREDIT',
//     ETAT_CAISSE = 'ETAT_CAISSE',
//     ETAT_BON = 'ETAT_BON',
//     X_PRINTER = 'X_PRINTER'
// }

export enum TypeStat {
    JOUR = 'JOUR',
    MOIS = 'MOIS',
    ANNEE = 'ANNEE'
}

export enum TypeStorage {
    EXERCICE = 'exercice',
    BOUTIQUE = 'boutique',
}

export const URLS_ACCES_ABON = ['/', '/abonnement', '/no-subcription'];
export const URLS_ACCES_AUTH = ['/'];

export enum AcceptFormatDoc {
    PDF = 'application/pdf',
    // WORDS = 'application/*',
    WORDS = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword',
    EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
    POWERPOINTE = 'application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint',
    CSV = 'text/csv',
}

// export function exportTableToExcel(data: any, fileName: string, sheetName: string) {
//     const ws: WorkSheet = utils.json_to_sheet(data);
//     const wb: WorkBook = utils.book_new();
//     utils.book_append_sheet(wb, ws, sheetName);
//     XLSX.writeFile(wb, fileName);
// }

export const MOIS_LIST: SelectItem[] = [
    {value: 1, label: 'JANVIER'},
    {value: 2, label: 'FEVRIER'},
    {value: 3, label: 'MARS'},
    {value: 4, label: 'AVRIL'},
    {value: 5, label: 'MAI'},
    {value: 6, label: 'JUIN'},
    {value: 7, label: 'JUILLET'},
    {value: 8, label: 'AOUT'},
    {value: 9, label: 'SEPTEMBRE'},
    {value: 10, label: 'OCTOBRE'},
    {value: 11, label: 'NOVEMBRE'},
    {value: 12, label: 'DECEMBRE'},
];

export const JOUR_LIST: SelectItem[] = [
    {value: 1, label: 'DIMANCHE'},
    {value: 2, label: 'LUNDI'},
    {value: 3, label: 'MARDI'},
    {value: 4, label: 'MERCREDI'},
    {value: 5, label: 'JEUDI'},
    {value: 6, label: 'VENDREDI'},
    {value: 7, label: 'SAMEDI'}
];

export function setLocalStorage(key: string, data: any) {
    localStorage.setItem(key.toString(), JSON.stringify(data));
}

export function getLocalStorage(key: string): any {
    const val = localStorage.getItem(key);
    return val !== 'null' && val !== 'undefined' ? JSON.parse(val) : null;
}

export  function getLocalstorageAsObject(key: string): any {
    const data = getLocalStorage(key);
    if (data) {
        return HadjUtils.fromJSON(data) as Object;
    }
}

export function printByFormat(arraybytes: ArrayBuffer, reportFormat: ReportFormat) {
    switch (reportFormat) {
        case ReportFormat.WORD:
            printWordFile(arraybytes);
            break;
        // case ReportFormat.EXCEL:
        //     printExcelFile(arraybytes);
        //     break;
        // default :
        //     printPdfFile(arraybytes);
    }
}

export enum EFormat {
    A_6 = 'A_6', A_7 = 'A_7', A_8 = 'A_8'
}

export function computTotal(values: any[]): number {
    let total = 0;
    values.forEach(value => total += value);
    return total;
}

// utils static functions
export class HadjUtils {

    public static fromJSON = (json: string): Object => {
        const jsonObject = JSON.parse(json);
        return new Object(jsonObject);
    };

    /**
     * ordonner la liste en fonction d'un
     * @param objectList
     * @param field
     * @param direction
     * @param isNumber
     */
    public static sortArray(objectList: Array<any>, field: string, direction: 'asc' | 'desc', isNumber = false): Array<any> {
        let array: Array<any> = objectList.map(item => ({...item}));
        switch (direction) {
            case 'desc': {
                array = array.sort((a, b) => String(a[field]).localeCompare(String(b[field]), undefined,
                    {numeric: isNumber}) > 0 ? -1 : 1);
                break;
            }
            case 'asc': {
                array = array.sort((a, b) => String(a[field]).localeCompare(String(b[field]), undefined,
                    {numeric: isNumber}) < 0 ? -1 : 1);
                break;
            }
        }
        return array;
    }

    /**
     * Ordonner une liste selon plusieurs critères.
     *
     * @param dataList liste à ordonner.
     * @param fields liste des champs
     * @param direction le sens d'ordonnancement
     * @param isNumber true si les critères sont des nombres et false sinon
     *
     * @return la liste ordonnée
     */
    // public static sortWithMultipleCriteria<T>(dataList: Array<T>, fields: Array<string>,
    //                                           direction: 'asc' | 'desc', isNumber: boolean): Array<T> {
    //     let sortedData: Array<T> = dataList;
    //     if (direction === 'desc') {
    //         fields.forEach((field, index) => {
    //             sortedData = sortedData.sort((a: T, b: T) => {
    //                 if (index === 0) {
    //                     return a[field].localeCompare(b[field], undefined, {numeric: isNumber}) > 0 ? -1 : 1;
    //                 } else {
    //                     if (a[fields[index - 1]].localeCompare(b[fields[index - 1]], undefined, {numeric: isNumber}) === 0) {
    //                         return a[field].localeCompare(b[field], undefined, {numeric: isNumber}) > 0 ? -1 : 1;
    //                     } else {
    //                         return a[fields[index - 1]].localeCompare(b[fields[index - 1]], undefined, {numeric: isNumber}) > 0 ? -1 : 1;
    //                     }
    //                 }
    //             });
    //         });
    //     } else if (direction === 'asc') {
    //         fields.forEach((field, index) => {
    //             sortedData = sortedData.sort((a: T, b: T) => {
    //                 if (index === 0) {
    //                     return a[field].localeCompare(b[field], undefined, {numeric: isNumber}) < 0 ? -1 : 1;
    //                 } else {
    //                     if (a[fields[index - 1]].localeCompare(b[fields[index - 1]], undefined, {numeric: isNumber}) === 0) {
    //                         return a[field].localeCompare(b[field], undefined, {numeric: isNumber}) < 0 ? -1 : 1;
    //                     } else {
    //                         return a[fields[index - 1]].localeCompare(b[fields[index - 1]], undefined, {numeric: isNumber}) < 0 ? -1 : 1;
    //                     }
    //                 }
    //             });
    //         });
    //     }

//         return sortedData;
//     }
}
