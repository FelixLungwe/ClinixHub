import { ClinixServiceService } from './../clinix-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [
  ]
})
export class AuthComponent implements OnInit {

  public user?: User;
  public users?: User[];
  public isAuth: boolean = false;
  public isOk: boolean = true;

  constructor(private clinixService: ClinixServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * onAuth
   */
  public onAuth(form: NgForm) {
    this.clinixService.getUsers().subscribe(
      (response: User[])=>{
        this.users = response;
        for(let user of this.users){
          if (user.email === form.value['email'] && user.password === form.value['password']) {
            localStorage.setItem('username', user.email);
            localStorage.setItem('fullname', user.fullname);
            localStorage.setItem('photo', user.photo);
            // this.router.navigate(['/menu']);
            this.router.navigateByUrl('/menu');
            this.isOk = false;
          }
        }
       if (this.isOk === true) {
        this.isAuth = true;
        setTimeout(() => {
          this.isAuth = false;
        }, 5000);
       }
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }
}
