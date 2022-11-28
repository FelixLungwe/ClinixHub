import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Patient } from './patient';
import { Observable } from 'rxjs';
import { AccueilConsultExt } from './accueilConsultExt';

@Injectable({
  providedIn: 'root'
})
export class ClinixService {

  public apiUrl1: string = 'http://localhost:8080';
  public apiURL:string = environment.host;

  constructor(private http: HttpClient) { }
  //--------------------------------------- Patient ---------------------------------------------
/**
   * addPatient
   */
 public addPatient(patient: Patient) : Observable<Patient> {
  console.log("-------> start onAddPatient service");
 // patient.dateEnregistre = Date();
  
  return this.http.post<Patient>(`${this.apiUrl1}/patient`, patient);
}
/**
 * getPatient
  */
 public getPatient(patientId: number): Observable<Patient> {
  console.log(`--->PatientService--->getPatient()`);

  return this.http.get<Patient>(`${this.apiUrl1}/Patient/${patientId}`);
}
/**
   * addProduit
  */
//  public addProduit(produit: Produit): Observable<Produit> {
//   console.log(`----->ProduitService--->addProduit()`);

//   return this.http.post<Produit>(`${this.apiUrl}/produit`, produit);
// }


//--------------------------------------- Accueil ---------------------------------------------

/**
   * addPatientToAccueilConsultExt
   */
 public addPatientToAccueilConsultExt(accueilConsultExt: AccueilConsultExt, patientID: number) : Observable<AccueilConsultExt> {
  console.log("-------> start onAddPatient service");
 // patient.dateEnregistre = Date();
  
  return this.http.post<AccueilConsultExt>(`${this.apiUrl1}/patientToAccueilConsultExt/${patientID}`, accueilConsultExt);
}

}