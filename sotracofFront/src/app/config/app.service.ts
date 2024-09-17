import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Client, DivisionFiscale, Signataire, TypePrestation } from './app.model';
import { Observable } from "rxjs";
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
}