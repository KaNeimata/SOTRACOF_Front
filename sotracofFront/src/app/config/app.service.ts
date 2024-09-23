import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ChampsDate, Client, DivisionFiscale, ModelFacture,
  Signataire, TypePrestation, ChampsString, ChampsDouble
} from './app.model';
import { forkJoin, map, Observable } from "rxjs";
import { AppEndpoint } from "./app.endpoint";

@Injectable({
  providedIn: 'root',
})
export class AppServices {

    constructor(protected http: HttpClient) {
    }
    // ===============================service Client ==========================

    getClients(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(`${AppEndpoint.CLIENT_URL}`, {observe: 'response'});
    }

    getClientById(id: number): Observable<HttpResponse<Client>> {
    return this.http.get<Client>(`${AppEndpoint.CLIENT_URL}/${id}`, { observe: 'response' });
    }

    createClient(client: Client): Observable<HttpResponse<Client>> {
        return this.http.post<Client>(`${AppEndpoint.CLIENT_URL}`, client, { observe: 'response' });
    }
    updateClient(client: Client): Observable<HttpResponse<Client>> {
    return this.http.put<Client>(`${AppEndpoint.CLIENT_URL}`, client, { observe: 'response' });
    }
    
    deleteClient(id: number): Observable<HttpResponse<Client>> {
    return this.http.delete(`${AppEndpoint.CLIENT_URL}/${id}`, { observe: 'response' });

  }


  // ===============================service prestation ==========================

    getAllPrestation(): Observable<HttpResponse<any[]>> {

    return this.http.get<TypePrestation[]>(`${AppEndpoint.TYPE_PRESTATION_URL}`, {observe: 'response'});

    }

    getPrestationById(id: Number): Observable<HttpResponse<Client>> {
    return this.http.get<TypePrestation>(`${AppEndpoint.TYPE_PRESTATION_URL}/${id}`, { observe: 'response' });
    }

    createTPrestation(prestation: TypePrestation): Observable<HttpResponse<TypePrestation>> {
        return this.http.post<TypePrestation>(`${AppEndpoint.TYPE_PRESTATION_URL}`, prestation, { observe: 'response' });
    }
    
    
    updateTPrestation(prestation: TypePrestation): Observable<HttpResponse<TypePrestation>> {
    return this.http.put<TypePrestation>(`${AppEndpoint.TYPE_PRESTATION_URL}`, prestation, { observe: 'response' });
    }
    
    deleteTPresatation(id: number): Observable<HttpResponse<TypePrestation>> {
    return this.http.delete(`${AppEndpoint.TYPE_PRESTATION_URL}/${id}`, { observe: 'response' });
  }


  // ===============================service Signaitre ==========================
    
    getAllSignataire(): Observable<HttpResponse<any[]>> {
    return this.http.get<Signataire[]>(`${AppEndpoint.SIGNATAIRE_URL}`, {observe: 'response'});
    }

    getSignataireById(id: Number): Observable<HttpResponse<Client>> {
    return this.http.get<Signataire>(`${AppEndpoint.SIGNATAIRE_URL}/${id}`, { observe: 'response' });
    }

    createSignataire(signataire: Signataire): Observable<HttpResponse<Signataire>> {
        return this.http.post<Signataire>(`${AppEndpoint.SIGNATAIRE_URL}`, signataire, { observe: 'response' });
    }
    
    
    updateSignataire(signataire: Signataire): Observable<HttpResponse<Signataire>> {
    return this.http.put<Signataire>(`${AppEndpoint.SIGNATAIRE_URL}`, signataire, { observe: 'response' });
    }
    
    deleteSignataire(id: Number): Observable<HttpResponse<Signataire>> {
    return this.http.delete(`${AppEndpoint.SIGNATAIRE_URL}/${id}`, { observe: 'response' });
  }

   // =============================== service divfiscal ==========================
    
    getDivisions(): Observable<HttpResponse<any[]>> {
    return this.http.get<DivisionFiscale[]>(`${AppEndpoint.DIVISION_FISCALE_URL}`, {observe: 'response'});
    }

    getDivisionById(id: Number): Observable<HttpResponse<DivisionFiscale>> {
    return this.http.get<DivisionFiscale>(`${AppEndpoint.DIVISION_FISCALE_URL}/${id}`, { observe: 'response' });
    }

    createDivision(division: DivisionFiscale): Observable<HttpResponse<DivisionFiscale>> {
        return this.http.post<DivisionFiscale>(`${AppEndpoint.DIVISION_FISCALE_URL}`, division, { observe: 'response' });
    }
    
    updateDivision(division: DivisionFiscale): Observable<HttpResponse<DivisionFiscale>> {
    return this.http.put<DivisionFiscale>(`${AppEndpoint.DIVISION_FISCALE_URL}`, division, { observe: 'response' });
    }
    
    deleteDivision(id: Number): Observable<HttpResponse<DivisionFiscale>> {
    return this.http.delete(`${AppEndpoint.DIVISION_FISCALE_URL}/${id}`, { observe: 'response' });
  }

  // =================================== SERVICE MODEL FACTURES==================================================
  getAllModelFacturesWithResponse(): Observable<HttpResponse<ModelFacture[]>> {
    return this.http.get<ModelFacture[]>(`${AppEndpoint.MODEL_URL}`, { observe: 'response' });
  }

  getModelById(id: number): Observable<HttpResponse<ModelFacture>> {
    return this.http.get<ModelFacture>(`${AppEndpoint.MODEL_URL}/${id}`, { observe: 'response' });
  }

  createModel(model: ModelFacture): Observable<HttpResponse<ModelFacture>> {
    return this.http.post<ModelFacture>(`${AppEndpoint.MODEL_URL}`, model, { observe: 'response' });
  }

  updateModel(model: ModelFacture): Observable<HttpResponse<ModelFacture>> {
    return this.http.put<ModelFacture>(`${AppEndpoint.MODEL_URL}`, model, { observe: 'response' });
  }

  deleteModel(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${AppEndpoint.MODEL_URL}/${id}`, { observe: 'response' });
  }

// ============== service dobtention de une liste de tous types de  champs================
  getAvailableFieldsDate(): Observable<ChampsDate[]> {
    return this.http.get<ChampsDate[]>('http://localhost:8080/api/champs/date');

  }
  
  getAvailableFieldsDouble(): Observable<ChampsDouble[]> {
    return this.http.get<ChampsDouble[]>('http://localhost:8080/api/champs/double');

  }
  
  getAvailableFieldsString(): Observable<ChampsString[]> {
    return this.http.get<ChampsString[]>('http://localhost:8080/api/champs/string');

  }
  // Fonction de fusion 
   getAllAvailableFields(): Observable<any[]> {
    const dateFields$ = this.getAvailableFieldsDate();
    const doubleFields$ = this.getAvailableFieldsDouble();
    const stringFields$ = this.getAvailableFieldsString();

    return forkJoin([dateFields$, doubleFields$, stringFields$]).pipe(
      map(([dateFields, doubleFields, stringFields]) => {
        return [...dateFields, ...doubleFields, ...stringFields];
      })
    );
  }

}
