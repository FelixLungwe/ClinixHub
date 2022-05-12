declare var $:any;
import { ClinixServiceService } from './../clinix-service.service';
import { Patient } from './../patient';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Acceuil } from '../acceuil';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

public patients: Patient[] = [];
public patient!: Patient;
public acceuils: Acceuil[] = [];
public fullname?: string;
public photo?: string;

  constructor(private clinixService: ClinixServiceService) { }

  ngOnInit(): void {
    this.fullname = localStorage.getItem('fullname')!;
    this.photo = localStorage.getItem('photo')!;
    
    this.getPatients();
    this.getAcceuil();

    this.select2();
  }

  /**
   * onEmptyPatient
   */
  public onEmptyPatient() {
    this.patient.patientId = "";
    this.patient.fullName = "";
    this.patient.phone =  "";
    this.patient.province = "";
    this.patient.sexe = "";
    this.patient.age = "";
  }
  /**
   * onLoadAllAccueil
   */
  public onLoadAllAccueil() {
    this.getAcceuil();
  }
  /**
   * onSearchAccueilByPatient
   */
  public onSearchAccueilByPatient(ngForm: NgForm) {
    
    this.clinixService.patient(ngForm.value["valeur"]).subscribe(
      (response: Patient)=>{
        this.acceuils = response.accueils;
        this.patient = response;
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
        
      }
    ); 
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

  /**
   * select2
   */
  select2() { 
    $('.select2').select2();
  }

}
