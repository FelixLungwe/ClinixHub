declare var $:any;
import { Acceuil } from './../acceuil';
import { HttpErrorResponse } from '@angular/common/http';
import { ClinixServiceService } from './../clinix-service.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../patient';
import { NgForm } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  public patients?: Patient[];
  public patient!: Patient;
  public userProfile!: User;
  public fullname?: string;
  public photo?: string;

  constructor(public clinixService:ClinixServiceService) { }

  ngOnInit(): void {
    let userName = localStorage.getItem('username');
    this.getUser(userName!);
    
    this.getPatients();
    this.tooltip();
  }

  /**
   * getUser
   */
  public getUser(userName: string) {
    this.clinixService.getUser(userName).subscribe(
      (response: User)=>{
          this.userProfile = response;
          this.photo = response.urlPicture;
          this.fullname = response.fullName;
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  public onModalOpenAccueil(patient: Patient, mode: string) {
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.setAttribute('data-toggle', 'modal');
    button.type = 'button';
    button.style.display = 'none';


    if (mode === 'add') {
      this.patient = patient;
      button.setAttribute('data-target', '#acceuil');
    }

    if (mode === 'update') {
      this.patient = patient;
      button.setAttribute('data-target', '#updatePatient');
    }

    container.appendChild(button);
    button.click();
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
  public onAddAcceuil(addForm: NgForm) {
    const b = document.getElementById('add-accueil')!;
    b.click();
    console.log(addForm.value);
    console.log(this.patient.id);
    
    this.clinixService.addAcceuil(addForm.value, this.patient.id!).subscribe(
      (response: void)=>{
        addForm.resetForm();
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  /**
   * onUpdatePatient
   */
  public onUpdatePatient(patient: Patient) {

    const b = document.getElementById('update-patient')!;
    b.click();

    this.clinixService.updatePatient(patient).subscribe(
      (response: Patient)=>{
        this.getPatients();
        console.log(response);
        
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
   * onAddPatient
   */
  public onAddPatient(addForm: NgForm) {
    const b = document.getElementById('addPatient')!;
    b.click();
    this.clinixService.addPatient(addForm.value).subscribe(
      (response: Patient) => {
        console.log(response);
        this.getPatients();
        addForm.resetForm();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        addForm.resetForm();
      }
    );
  }

  /**
   * tooltip
   */
   tooltip() {
    $('[data-toggle="tooltip"]').tooltip();
  }

}
