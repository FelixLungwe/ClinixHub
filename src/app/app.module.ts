import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AuthComponent } from './auth/auth.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { PatientComponent } from './patient/patient.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ConsultationComponent } from './consultation/consultation.component'; 

const routes: Routes = [
  { path: "login", component: AuthComponent },
  { path: "roles", component: RoleComponent },
  { path: "acceuil", component: AcceuilComponent },
  { path: "patients", component: PatientComponent },
  { path: "menu", component: MenuComponent },
  { path: "users", component: UserComponent },
  { path: "consultation", component: ConsultationComponent },
  { path: "", redirectTo: "/menu", pathMatch: "full"},
  { path: "**", component: AuthComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AuthComponent,
    RoleComponent,
    UserComponent,
    PatientComponent,
    AcceuilComponent,
    ConsultationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
