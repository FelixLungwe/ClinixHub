import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AuthComponent } from './auth/auth.component';
import { RoleComponent } from './role/role.component'; 

const routes: Routes = [
  { path: "login", component: AuthComponent },
  { path: "roles", component: RoleComponent },
  { path: "menu", component: MenuComponent },
  { path: "", redirectTo: "/menu", pathMatch: "full"},
  { path: "**", component: AuthComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AuthComponent,
    RoleComponent,
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
