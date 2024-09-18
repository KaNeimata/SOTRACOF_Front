import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChampsDate } from './config/app.model';
import { ChampsDouble } from './config/app.model';
import { ChampsString } from './config/app.model';

const httpOptions =
{
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'mode': 'no-cors'})
};

@Injectable({
  providedIn: 'root'
})
export class ParametreService {

  apiDate: string='http://localhost:8080/api/champs/date';
  apiDouble:string='http://localhost:8080/api/champs/double';
  apiString : string='http://localhost:8080/api/champs/string';

  champsDates:any=[];
  champsDoubles:any=[];
  champsStrings:any=[];
  constructor(private http: HttpClient) { }

//service champs date
listeChampsDate(): Observable<ChampsDate[]> {
    return this.http.get<ChampsDate[]>(this.apiDate);
  }
addChampsDate(vir: ChampsDate): Observable<ChampsDate> {
    return this.http.post<ChampsDate>(this.apiDate, vir, httpOptions);
  }
consulterChampsDate(id:number):Observable<ChampsDate>{
    const url = `${this.apiDate}/${id}`;
    return this.http.get<ChampsDate>(url);
    }
  supprimerChampsDate(id: number) {
  const url = `${this.apiDate}/${id}`;
  return this.http.delete(url, httpOptions);
}
//champ double
listeChampsDouble(): Observable<ChampsDouble[]> {
  return this.http.get<ChampsDouble[]>(this.apiDouble);
}
addChampsDouble(vir: ChampsDouble): Observable<ChampsDouble> {
  return this.http.post<ChampsDouble>(this.apiDouble, vir, httpOptions);
}
consulterChampsDouble(id:number):Observable<ChampsDouble>{
  const url = `${this.apiDouble}/${id}`;
  return this.http.get<ChampsDouble>(url);
  }
supprimerChampsDouble(id: number) {
const url = `${this.apiDouble}/${id}`;
return this.http.delete(url, httpOptions);
}
//champs string

listeChampsString(): Observable<ChampsString[]> {
  return this.http.get<ChampsString[]>(this.apiString);
}
addChampsString(vir: ChampsString): Observable<ChampsString> {
  return this.http.post<ChampsString>(this.apiString, vir, httpOptions);
}
consulterChampsString(id:number):Observable<ChampsString>{
  const url = `${this.apiString}/${id}`;
  return this.http.get<ChampsString>(url);
  }
supprimerChampsString(id: number) {
const url = `${this.apiString}/${id}`;
return this.http.delete(url, httpOptions);
}
}
