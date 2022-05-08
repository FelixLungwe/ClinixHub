import { User } from './../user';
import { ClinixServiceService } from './../clinix-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [
  ]
})
export class AuthComponent implements OnInit {


  public mode!: number;

  constructor(private clinixService: ClinixServiceService, private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('photo');localStorage.removeItem('jwtToken');localStorage.removeItem('username');localStorage.removeItem('role');
  }

  

  /**
   * onAuthentication
   */
  public onAuthentication(addForm: NgForm) {
    this.clinixService.authentication(addForm.value).subscribe(
      (response: any)=>{
        localStorage.setItem('jwtToken', response.headers.get("Authorization"));
        let jwtHelper = new JwtHelperService();
        let jwt = localStorage.getItem('jwtToken');
        let jwtObject = jwtHelper.decodeToken(jwt!);
        
        localStorage.setItem('username', jwtObject.sub);
        localStorage.setItem('role', jwtObject.roles);

        addForm.reset();

        this.router.navigateByUrl("/menu");
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
        this.mode = 1;
        setTimeout(() => {
          this.mode = 2;
        }, 5000);
      }
    );
  }

}
