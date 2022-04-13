import { User } from './../user';
import { ClinixServiceService } from './../clinix-service.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user', 
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users?: User[];
  public isOk: boolean = false;
  public userDelete?: User | null;
  public userUpdate?: User | null;
  public fullname?: string;
  public photo?: string;

  constructor(private clinixService: ClinixServiceService) { }

  ngOnInit(): void {
    this.fullname = localStorage.getItem('fullname')!;
    this.photo = localStorage.getItem('photo')!;
    this.getUsers();
  }

  public onOpenModalRole(user: User | null, mode: string) {
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.setAttribute('data-toggle', 'modal');
    button.type = 'button';
    button.style.display = 'none';


    if (mode === 'update') {
      this.userUpdate = user;
      button.setAttribute('data-target', '#updateUser')
    }

    if (mode === 'delete') { 
      this.userDelete = user;
      button.setAttribute('data-target', '#deleteUser')
    }

    container.appendChild(button);
    button.click();
  }

  public onUpdateRole(user: User) : void {
    const b = document.getElementById('update-user')!;
    b.click();

    this.clinixService.updateUser(user).subscribe(
      (response: User)=>{
        this.getUsers();
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  public onDeleteRole(userId: any) : void {

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
