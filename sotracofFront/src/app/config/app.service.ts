import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Client, TypePrestation } from './app.model';
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
    return this.http.get<any[]>(`${AppEndpoint.CLIENT_URL}/list`, {observe: 'response'});
    }

    getClientById(id: Number): Observable<HttpResponse<Client>> {
    return this.http.get<Client>(`${AppEndpoint.CLIENT_URL}/${id}`, { observe: 'response' });
    }

    createClient(client: Client): Observable<HttpResponse<Client>> {
        return this.http.post<Client>(`${AppEndpoint.CLIENT_URL}/create`, client, { observe: 'response' });
    }
    
    
    updateClient(id: Number, client: Client): Observable<HttpResponse<Client>> {
    return this.http.put<Client>(`${AppEndpoint.CLIENT_URL}/update/${id}`, client, { observe: 'response' });
    }
    
    deleteClient(id: Number): Observable<HttpResponse<Client>> {
    return this.http.delete(`${AppEndpoint.CLIENT_URL}/delete/${id}`, { observe: 'response' });
  }


  // ===============================service prestation ==========================
    
    getAllPrestation(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(`${AppEndpoint.TYPE_PRESTATION_URL}/list`, {observe: 'response'});
    }

    getPrestationById(id: Number): Observable<HttpResponse<Client>> {
    return this.http.get<TypePrestation>(`${AppEndpoint.TYPE_PRESTATION_URL}/${id}`, { observe: 'response' });
    }

    createTPrestation(prestation: TypePrestation): Observable<HttpResponse<TypePrestation>> {
        return this.http.post<TypePrestation>(`${AppEndpoint.TYPE_PRESTATION_URL}/create`, prestation, { observe: 'response' });
    }
    
    
    updateTPrestation(id: Number, prestation: TypePrestation): Observable<HttpResponse<TypePrestation>> {
    return this.http.put<TypePrestation>(`${AppEndpoint.TYPE_PRESTATION_URL}/update/${id}`, prestation, { observe: 'response' });
    }
    
    deleteTPresatation(id: Number): Observable<HttpResponse<TypePrestation>> {
    return this.http.delete(`${AppEndpoint.TYPE_PRESTATION_URL}/delete/${id}`, { observe: 'response' });
  }
}