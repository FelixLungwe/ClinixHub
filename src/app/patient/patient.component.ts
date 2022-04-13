declare var $:any;
import { Acceuil } from './../acceuil';
import { HttpErrorResponse } from '@angular/common/http';
import { ClinixServiceService } from './../clinix-service.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../patient';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  public patients?: Patient[];


  public fullname?: string;
  public photo?: string;

  constructor(private clinixService:ClinixServiceService) { }

  ngOnInit(): void {
    this.fullname = localStorage.getItem('fullname')!;
    this.photo = localStorage.getItem('photo')!;
    
    this.getPatients();
    this.tooltip();
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
   * addAcceuil
   */
  public addAcceuil(acceuil: NgForm) {
    const b = document.getElementById('add-accueil')!;
    b.click();

    this.clinixService.addAcceuil(acceuil.value).subscribe(
      (response: Acceuil)=>{
        acceuil.resetForm();
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  public searchEmploye(key: string) : void {
    const results: Patient[] = [];
    for(const patient of this.patients!)
    {
      if (patient.patientId.toLowerCase().indexOf(key.toLowerCase()) !== -1 || patient.fullName.toLowerCase().indexOf(key.toLowerCase()) !== -1 )
      {
          results.push(patient);
      }
    }
    this.patients = results;

    if (results.length === 0 || !key) {
       this.getPatients();
    }
  }

  /**
   * tooltip
   */
   tooltip() {
    $('[data-toggle="tooltip"]').tooltip();
  }

}
