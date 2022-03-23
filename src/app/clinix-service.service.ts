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
    console.log('getUsers()');
    return this.http.get<User[]>(this.apiURL+"/user"); 
  }

   
}
