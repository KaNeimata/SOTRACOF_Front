import { Routes } from "@angular/router";
import { LoginComponent } from "./shared/account/login/login.component";
import { RegisterComponent } from "./shared/account/register/register.component";
import { FacturationComponent } from "./pages/facturation/facturation.component";
import { ClientsComponent } from "./pages/clients/clients.component";
import { PrestationsComponent } from "./pages/prestations/prestations.component";
import { SignatairesComponent } from "./pages/signataires/signataires.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ModelFactureComponent } from "./pages/model-facture/model-facture.component";
import { IntitulesComponent } from "./pages/intitules/intitules.component";
import { ProfileComponent } from "./shared/account/profile/profile.component";
import { ReglementComponent } from "./pages/reglement/reglement.component";
import { DivisionFiscaleComponent } from "./pages/division-fiscale/division-fiscale.component";
import { RegimeFiscaleComponent } from "./pages/regime-fiscale/regime-fiscale.component";
import { FormeJuriqueComponent } from "./pages/forme-jurique/forme-jurique.component";

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'accueil', component: DashboardComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'profil', component: ProfileComponent },
  { path: 'listeFactures', component: FacturationComponent },
  { path: 'listeClients', component: ClientsComponent },
  { path: 'listePrestations', component: PrestationsComponent },
  { path: 'listeSignataires', component: SignatairesComponent },
  { path: 'listeModels', component: ModelFactureComponent },
  { path: 'listeIntitules', component: IntitulesComponent },
  { path: 'paiement', component: ReglementComponent },
  { path: 'diviFiscale', component: DivisionFiscaleComponent },
  { path: 'regimeFiscale', component: RegimeFiscaleComponent },
  { path: 'formeJuridique', component: FormeJuriqueComponent}
];
