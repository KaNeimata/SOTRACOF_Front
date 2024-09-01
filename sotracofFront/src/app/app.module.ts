import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainHeaderComponent } from './shared/components/main-header/main-header.component';
import { MainSidebarComponent } from './shared/components/main-sidebar/main-sidebar.component';
import { MainContentWrapperComponent } from './shared/components/main-content-wrapper/main-content-wrapper.component';
import { MainFooterComponent } from './shared/components/main-footer/main-footer.component';
import { LoginComponent } from './shared/account/login/login.component';
import { RegisterComponent } from './shared/account/register/register.component';
import { FacturationComponent } from './pages/facturation/facturation.component';
import { ReglementComponent } from './pages/reglement/reglement.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { SignatairesComponent } from './pages/signataires/signataires.component';
import { PrestationsComponent } from './pages/prestations/prestations.component';
import { IntitulesComponent } from './pages/intitules/intitules.component';
import { ModelFactureComponent } from './pages/model-facture/model-facture.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './shared/account/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    MainContentWrapperComponent,
    MainFooterComponent,
    LoginComponent,
    RegisterComponent,
    FacturationComponent,
    ReglementComponent,
    ClientsComponent,
    SignatairesComponent,
    PrestationsComponent,
    IntitulesComponent,
    ModelFactureComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ButtonModule,
    CheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
