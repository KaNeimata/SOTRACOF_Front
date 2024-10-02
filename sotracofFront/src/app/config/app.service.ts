import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Client, DivisionFiscale, ModelFacture,
  Signataire, TypePrestation, Champs,
  RegleCalcul
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

    getAllPrestation(): Observable<HttpResponse<TypePrestation[]>> {

    return this.http.get<TypePrestation[]>(`${AppEndpoint.TYPE_PRESTATION_URL}`, {observe: 'response'});

    }

    getPrestationById(id: Number): Observable<HttpResponse<TypePrestation>> {
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

  // ==============================Service de recuperation pour les relation ===========
  getAllClient(): Observable<Client[]> {
    return this.http.get<Client[]>(`${AppEndpoint.CLIENT_URL}`);

  }
  getAllPrestationforOther(): Observable<TypePrestation[]> {
    return this.http.get<TypePrestation[]>(`${AppEndpoint.TYPE_PRESTATION_URL}`);

  }

  // =======================================Service modelFacture ====================
  getAllModelFactures(): Observable<HttpResponse<ModelFacture[]>> {
    return this.http.get<ModelFacture[]>(`${AppEndpoint.MODEL_FACTURE_URL}`, { observe: 'response' });
  }

  getModelFactureById(id: number): Observable<HttpResponse<ModelFacture>> {
    return this.http.get<ModelFacture>(`${AppEndpoint.MODEL_FACTURE_URL}/${id}`, { observe: 'response' });
  }

  createModelFacture(dto: ModelFacture): Observable<HttpResponse<ModelFacture>> {
    return this.http.post<ModelFacture>(`${AppEndpoint.MODEL_FACTURE_URL}`, dto, { observe: 'response' });
  }

  updateModelFacture(dto: ModelFacture): Observable<HttpResponse<ModelFacture>> {
    return this.http.put<ModelFacture>(`${AppEndpoint.MODEL_FACTURE_URL}/${dto.id}`, dto, { observe: 'response' });
  }

  deleteModelFacture(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${AppEndpoint.MODEL_FACTURE_URL}/${id}`, { observe: 'response' });
  }
// ============================================ service champs =========================
   getAllChamps(): Observable<Champs[]> {
    return this.http.get<Champs[]>(`${AppEndpoint.CHAMPS_URL}`);

  }
  getChampsById(id: number): Observable<HttpResponse<Champs>> {
    return this.http.get<Champs>(`${AppEndpoint.CHAMPS_URL}/${id}`, { observe: 'response' });
  }

  createChamps(dto: Champs): Observable<HttpResponse<Champs>> {
    return this.http.post<Champs>(`${AppEndpoint.CHAMPS_URL}`, dto, { observe: 'response' });
  }

  updateChamps(dto: Champs): Observable<HttpResponse<Champs>> {
    console.log('Données envoyées au service:', JSON.stringify(dto, null, 2));
    return this.http.put<Champs>(`${AppEndpoint.CHAMPS_URL}/${dto.id}`, dto, { observe: 'response' });
  }

  deleteChamps(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${AppEndpoint.CHAMPS_URL}/${id}`, { observe: 'response' });
  }

  // ============================================ service Regle calcul =========================
   getAllRC(): Observable<RegleCalcul[]> {
    return this.http.get<RegleCalcul[]>(`${AppEndpoint.REGLE_CALCUL_URL}`);

  }
  getRCById(id: number): Observable<HttpResponse<RegleCalcul>> {
    return this.http.get<RegleCalcul>(`${AppEndpoint.REGLE_CALCUL_URL}/${id}`, { observe: 'response' });
  }

  createRC(dto: RegleCalcul): Observable<HttpResponse<RegleCalcul>> {
    return this.http.post<RegleCalcul>(`${AppEndpoint.REGLE_CALCUL_URL}`, dto, { observe: 'response' });
  }

  updateRC(dto: RegleCalcul): Observable<HttpResponse<RegleCalcul>> {
    console.log('Données envoyées au service:', JSON.stringify(dto, null, 2));
    return this.http.put<RegleCalcul>(`${AppEndpoint.REGLE_CALCUL_URL}/${dto.id}`, dto, { observe: 'response' });
  }

  deleteRC(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${AppEndpoint.REGLE_CALCUL_URL}/${id}`, { observe: 'response' });
  }

}
