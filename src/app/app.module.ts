import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
//import { ProduitComponent } from './produit/produit.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderAsideComponent } from './header-aside/header-aside.component';
import { MyFooterComponent } from './my-footer/my-footer.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ConsultExterneComponent } from './consult-externe/consult-externe.component';
import { ExamenComponent } from './examen/examen.component';
//import { AccueilConsultExt } from './acceuilConsultExt.ts';



@NgModule({
  declarations: [
    AppComponent,
   // ProduitComponent,
    FooterComponent,
    HeaderAsideComponent,
    MyFooterComponent,
    MainContentComponent,
    ConsultExterneComponent,
    ExamenComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
