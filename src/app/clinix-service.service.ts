import { Acceuil } from './acceuil';
import { Patient } from './patient';
import { Role } from './role';
import { environment } from './../environments/environment';
import { Injectable, Host } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClinixServiceService {

  public apiURL:string = environment.host;

  constructor(private http: HttpClient) { }

  /**
   * authentication
   */
  public authentication(user: User) {
    return this.http.post<string>(this.apiURL+"/login", user, { observe: "response" });
  }

  /**
   * isAdmin
   */
  public isAdmin() : boolean {
    let roles = localStorage.getItem('role')!;
    return roles.indexOf('admin') >= 0;
  }
  /**
   * isLogged
   */
  public isLogged() : boolean{
    let jwt = localStorage.getItem('jwtToken');
    if (jwt == null) {
      return false;
    }
    return true;
  }

  /**
   * getToken
   */
  public getToken() : HttpHeaders {
    let jwt = localStorage.getItem('jwtToken')!;
    let header = new HttpHeaders({ 'Authorization': 'Bearer '+jwt });
    return header;
  }

  //---- photo ----------------/

  /**
   * getPhoto
   */
  public getPhoto() : Observable<HttpEvent<Blob>>{
    return this.http.get(this.apiURL+"/clinix-SIH_api/download/1.jpg", {observe: 'events',responseType: 'blob'});
  }

  //--------- user and role-----------//

  /**
   * getUser
   */
  public getUser(userName: string) : Observable<User>{
    return this.http.get<User>(this.apiURL+"/clinix-SIH_api/user/"+userName, {headers: this.getToken()});
  }
   
  /**
   * getUsers
   */
  public getUsers() : Observable<User[]>{
    // let jwt = localStorage.getItem('jwtToken');
    // let header = new HttpHeaders({ 'Authorization': 'Bearer '+jwt });

    return this.http.get<User[]>(this.apiURL+"/clinix-SIH_api/users", {headers: this.getToken()}); 
  }

  public getRoles() : Observable<Role[]>{
    return this.http.get<Role[]>(this.apiURL+"/clinix-SIH_api/roles", {headers: this.getToken()}); 
  }

  /**
   * saveRole
   */
  public saveRole(role: Role) : Observable<Role> {
    return this.http.post<Role>(this.apiURL+"/clinix-SIH_api/roles", role, {headers: this.getToken()});
  }

  /**
   * saveUser
   */
  public saveUser(user: User) : Observable<User>{
    return this.http.post<User>(this.apiURL+"/clinix-SIH_api/user", user);
  }

  public updateRole(role: Role) : Observable<Role> {
    return this.http.put<Role>(this.apiURL+"/clinix-SIH_api/role", role, {headers: this.getToken()});
  }

  public updateUser(user: User) : Observable<User> {
    return this.http.post<User>(this.apiURL+"/clinix-SIH_api/user", user, {headers: this.getToken()});
  }

  /**
   * deleteRole
   */
  public deleteRole(roleId: number) : Observable<void>{
    return this.http.delete<void>(this.apiURL+"/clinix-SIH_api/role/"+roleId, {headers: this.getToken()});
  }

  public deleteUser(userId: number) : Observable<void>{
    return this.http.delete<void>(this.apiURL+"/clinix-SIH_api/user/"+userId);
  }

  //------------// patient //-------------------------//

  /**
   * addPatient
   */
  public addPatient(patient: Patient) : Observable<Patient> {
    return this.http.post<Patient>(this.apiURL+"/clinix-SIH_api/patient", patient);
  }


  /**
   * getPatients
   */
  public getPatients() : Observable<Patient[]>{
    return this.http.get<Patient[]>(this.apiURL+"/clinix-SIH_api/patient")
  }
  //------------// end patient //--------------------//

  //------------// acceuil //-------------------------//

  /**
   * getAcceuil
   */
  public getAcceuil() : Observable<Acceuil[]> {
    return this.http.get<Acceuil[]>(this.apiURL+"/clinix-SIH_api/acceuil");
  }

  /**
   * nbrAccueil
   */
  public nbrAccueil() : Observable<number>{
    return this.http.get<number>(this.apiURL+"/clinix-SIH_api/nbreAccueils");
  }

  /**
   * getPatientByAccueil
   */
  public getPatientByAccueil() : Observable<Patient[]>{
    return this.http.get<Patient[]>(this.apiURL+"/clinix-SIH_api/getPatientByAccueil");
  }

  /**
   * changeStatePatient
   */
  public changeStatePatient(idAccueil: number) : Observable<void>{
    return this.http.post<void>(this.apiURL+"/clinix-SIH_api/acceuil/patient/"+idAccueil,null);
  }

  /**
   * addAcceuil
   */
  public addAcceuil(acceuil: Acceuil, idPatient: number) : Observable<void> {
    return this.http.post<void>(this.apiURL+"/clinix-SIH_api/acceuil/"+idPatient, acceuil);
  }
  //------------// end acceuil //--------------------//
   
}
