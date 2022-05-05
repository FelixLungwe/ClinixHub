import { User } from './../user';
import { ClinixServiceService } from './../clinix-service.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user', 
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users?: User[];
  public user?: User;
  public isOk: boolean = false;
  public fullname?: string;
  public photo?: string;
  public userId?: number;
  public filename?: string;

  constructor(public clinixService: ClinixServiceService, private router: Router) { }

  ngOnInit(): void {
    let userName = localStorage.getItem('username');
    this.getUser(userName!);
    this.getUsers();
  }

  /**
   * getUser
   */
  public getUser(userName: string) {
    this.clinixService.getUser(userName).subscribe(
      (response: User)=>{
          // localStorage.setItem('photo', response.urlPicture);
          this.photo = response.urlPicture;
          this.fullname = response.fullName;
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  public onAddPicture(event: any) : void {
    let file: File = event.target.files[0];
    const b = document.getElementById('add-user')!;
    // b.click();

    const formData = new FormData();
    formData.append('urlPicture', file, file.name); 
    this.clinixService.onAddPicture(formData).subscribe(
      (response: string)=>{
        
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
        this.filename = error.error.text;
      }
    );
  }

  public onOpenModalUser(user: User, mode: string) {
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.setAttribute('data-toggle', 'modal');
    button.type = 'button';
    button.style.display = 'none';


    if (mode === 'update') {
      this.user = user;
      button.setAttribute('data-target', '#updateUser')
    }

    if (mode === 'detail') {
      this.user = user;
      button.setAttribute('data-target', '#detailUser')
    }

    if (mode === 'delete') { 
      this.userId = user.id;
      button.setAttribute('data-target', '#deleteUser')
    }

    container.appendChild(button);
    button.click();
  }

  public onUpdateUser(user: User) : void {
    const b = document.getElementById('update-user')!;
    b.click();
    user.urlPicture = this.filename!;
    this.clinixService.updateUser(user).subscribe(
      (response: User)=>{
        this.getUsers();
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  public ondeleteUser(userId: any) : void {

    this.clinixService.deleteUser(userId).subscribe(
      (response: void)=>{
        this.getUsers();
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }


  /**
   * getUsers
   */
  public getUsers() {
    this.clinixService.getUsers().subscribe(
      (response: User[])=>{
        this.users = response;
        // console.log(this.users[0].appRoles);
      },
      (error: HttpErrorResponse)=>{
         
        console.log(error);
      }
    );
  }

  // /**
  //  * resetPassword
  //  */
  // public resetPassword() {
  //    this.isOk = true;
  //    setTimeout(() => {
  //      this.isOk = false;
  //    }, 3000);
  // }
   /**
   * resetPassword
   */
  public ok?: boolean;
  public resetPassword() {
    this.isOk = false;
    this.ok = true;
    setTimeout(() => {
      this.isOk = true;
      this.ok = false;
      setTimeout(() => {
        this.isOk = false;
      }, 3000);
    }, 3000);
 }
}
