import { ClinixServiceService } from './../clinix-service.service';
import { Patient } from './../patient';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Acceuil } from '../acceuil';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

public patients: Patient[] = [];
public acceuils: Acceuil[] = [];
public fullname?: string;
public photo?: string;

  constructor(private clinixService: ClinixServiceService) { }

  ngOnInit(): void {
    this.fullname = localStorage.getItem('fullname')!;
    this.photo = localStorage.getItem('photo')!;
    
    this.getPatients();
    this.getAcceuil();
  }

  /**
   * getPatients
   */
  public getPatients() {
    this.clinixService.getPatients().subscribe(
      (response: Patient[])=>{
        this.patients = response;
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
        
      }
    );
  }

  /**
   * getAcceuil
   */
  public getAcceuil() {
    this.clinixService.getAcceuil().subscribe(
      (response: Acceuil[])=>{
        this.acceuils = response;
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
        
      }
    );
  }

}
