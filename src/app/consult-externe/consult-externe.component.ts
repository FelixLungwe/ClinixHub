import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccueilConsultExt } from '../accueilConsultExt';
import { ClinixService } from '../clinix.service';
import { Patient } from '../patient';

@Component({
  selector: 'app-consult-externe',
  templateUrl: './consult-externe.component.html',
  styleUrls: ['./consult-externe.component.css']
})
export class ConsultExterneComponent implements OnInit {

  constructor(private clinixService: ClinixService) { }
  public mode!: number;
  public patient!: Patient;
  public patientRecent!: Patient;
  public patientRecentID!: number;
 // public patientActiveID!: number;
  public accueilConsultExt!: AccueilConsultExt;
   

  ngOnInit(): void {
  }

  /**
   * onAddPatient
addFormPatient: NgForm   */
  public onAddPatient(addFormPatient: NgForm) {
    console.log("_______>start onAddPatient ts");
    this.patient = addFormPatient.value
    this.patient.dateEnregistre = new Date();
    console.log("----date et heure----->"+this.patient.dateEnregistre);
    
    
    this.clinixService.addPatient(this.patient).subscribe(
      (response: Patient)=>{
        console.log(response);
        this.patientRecent = response;
        console.log("-------->patientRecent:"+this.patientRecent);
        
        this.patientRecentID = this.patientRecent.patient_id;
        // document.getElementById('patientActiveID')?.nodeValue
        document.getElementById('patientActiveID')?.nodeValue;
        console.log("-------->patientRecent:"+this.patientRecentID);

        addFormPatient.resetForm();
        this.mode = 1;
      setTimeout(() => {
        this.mode = 2;
      }, 5000);
      console.log("-------> end onAddPatient ts");
      
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
        addFormPatient.resetForm();
      }
      );
    
  }


  /**
   * onAddAccueilConsultExt
addFormAccueilConsultExt: NgForm  onAddPatientToAccueilConsultExt */
public onAddPatientToAccueilConsultExt(addFormAccueilConsultExt: NgForm) {
  console.log("_______>start onAddAccueilConsultExt ts");
//   this.patientRecentID = Number(document.getElementById('patientActiveID')?.nodeValue);
   console.log("------------------>PatientREcentID:------->"+this.patientRecentID);
   
   this.accueilConsultExt = addFormAccueilConsultExt.value;
   this.accueilConsultExt.state = 1;
   this.accueilConsultExt.dateConsult = new Date();
  this.clinixService.addPatientToAccueilConsultExt(this.accueilConsultExt, this.patientRecentID).subscribe(
    (response: AccueilConsultExt)=>{
      console.log(response);
      this.accueilConsultExt = response;
      console.log("-------->AccueilConsultExtRecent:"+this.accueilConsultExt);
      
      addFormAccueilConsultExt.resetForm();
      this.mode = 1;
    setTimeout(() => {
      this.mode = 2;
    }, 5000);
    console.log("-------> end onAddAccueilConsultExt ts");
    
    },
    (error: HttpErrorResponse)=>{
      console.log(error);
      addFormAccueilConsultExt.resetForm();
    }
    );
  
}

   /**
   * onAddPatient
   */
    // public onAddPatient1(addForm: NgForm) {
    //   const b = document.getElementById('addPatient')!;
    //   b.click();
    //   this.clinixService.addPatient(addForm.value).subscribe(
    //     (response: Patient) => {
    //       console.log(response);
    //       this.getPatients();
    //       addForm.resetForm();
    //     },
    //     (error: HttpErrorResponse) => {
    //       console.log(error);
    //       addForm.resetForm();
    //     }
    //   );
    // }
    
}

