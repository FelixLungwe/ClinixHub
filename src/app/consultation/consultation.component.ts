import { Patient } from './../patient';
import { HttpErrorResponse } from '@angular/common/http';
import { ClinixServiceService } from './../clinix-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {

  public newPatient: number = 0;
  public patients!: Patient[];
  public notification: boolean = false;
  // public notif: boolean;

  constructor(private clinixService: ClinixServiceService) { }

  ngOnInit(): void {
    this.nouveauPatient();
    this.getPatientByAccueil();
  }

  /**
   * onClickBell
   */
  public onClickBell() {
    this.notification = false;
  }

  /**
   * onErasePatient
   */
  public onErasePatient(idPatient: number) {
    // this.clinixService.changeStatePatient().subscribe();
  }

  /**
   * nouveauPatient
   */
  public nouveauPatient() {
    this.clinixService.nbrAccueil().subscribe(
      (response: number)=>{
        if (this.newPatient < response) {
          this.newPatient = response;
          this.notification = true;
        }
        else{
          this.notification = false;
        }
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
    setInterval(this.nouveauPatient, 1000); 
  }

  /**
   * getPatientByAccueil
   */
  public getPatientByAccueil() {
    this.clinixService.getPatientByAccueil().subscribe(
      (response: Patient[])=>{
        this.patients = response;
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
    setInterval(this.getPatientByAccueil, 1000); 
  }

}
