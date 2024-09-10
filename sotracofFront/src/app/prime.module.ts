import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCrudGenericComponent } from './shared/crud_generic/app-crud-generic/app-crud-generic.component';
import { FormInputTemplateComponent } from './shared/form-input-template/form-input-template.component';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [
    //  AppCrudGenericComponent,
    //   FormInputTemplateComponent
  ],
  imports: [
    CommonModule,
      AccordionModule,
      AutoCompleteModule,
      AvatarModule,
      AvatarGroupModule,
      BadgeModule,
      BreadcrumbModule,
      ButtonModule,
      CalendarModule,
    
  ]
})
export class PrimeModule { }
