import { Acceuil } from './acceuil';
import { Patient } from './patient';
import { Role } from './role';
import { environment } from './../environments/environment';
import { Injectable, Host } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
   * getUsers
   */
  public getUsers() : Observable<User[]>{
    return this.http.get<User[]>(this.apiURL+"/user"); 
  }

  public getRoles() : Observable<Role[]>{
    return this.http.get<Role[]>(this.apiURL+"/role"); 
  }

  /**
   * saveRole
   */
  public saveRole(role: Role) : Observable<Role> {
    return this.http.post<Role>(this.apiURL+"/role", role);
  }

  /**
   * saveUser
   */
  public saveUser(user: User) : Observable<User>{
    return this.http.post<User>(this.apiURL+"/user", user);
  }

  public updateRole(role: Role) : Observable<Role> {
    return this.http.put<Role>(this.apiURL+"/role/"+role.id, role);
  }

  public updateUser(user: User) : Observable<User> {
    return this.http.put<User>(this.apiURL+"/user/"+user.id, user);
  }

  /**
   * deleteRole
   */
  public deleteRole(roleId: number) : Observable<void>{
    return this.http.delete<void>(this.apiURL+"/role/"+roleId);
  }

  public deleteUser(userId: number) : Observable<void>{
    return this.http.delete<void>(this.apiURL+"/user/"+userId);
  }

  //------------// patient //-------------------------//
  /**
   * getPatients
   */
  public getPatients() : Observable<Patient[]>{
    return this.http.get<Patient[]>(this.apiURL+"/patient")
  }
  //------------// end patient //--------------------//

  //------------// acceuil //-------------------------//

  /**
   * getAcceuil
   */
  public getAcceuil() : Observable<Acceuil[]> {
    return this.http.get<Acceuil[]>(this.apiURL+"/acceuil");
  }

  /**
   * addAcceuil
   */
  public addAcceuil(acceuil: Acceuil) : Observable<Acceuil> {
    return this.http.post<Acceuil>(this.apiURL+"/acceuil", acceuil);
  }
  //------------// end acceuil //--------------------//
   
}
