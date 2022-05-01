import { User } from './../user';
import { ClinixServiceService } from './../clinix-service.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../role';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  public roles?: Role[];
  public role?: Role;
  public roleId?: number;
  public fullname?: string;
  public photo?: string;

  constructor(public clinixService: ClinixServiceService) { }

  ngOnInit(): void {
    let userName = localStorage.getItem('username');
    this.getUser(userName!);

    this.getRoles();
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


  public onAddUser(addForm: NgForm) : void {
    const b = document.getElementById('add-user')!;
    b.click();

    this.clinixService.saveUser(addForm.value).subscribe(
      (response: User)=>{
        addForm.resetForm();
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }


  /**
   * getRoles
   */
  public getRoles() {
    this.clinixService.getRoles().subscribe(
      (response: Role[])=>{
        this.roles = response;
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
        
      }
    );
  }

  /**
   * onSaveRole
   */
  public onSaveRole(form: NgForm) {
    const b = document.getElementById('add-role')!;
    b.click();

    this.clinixService.saveRole(form.value).subscribe(
      (response: Role)=>{
        this.getRoles();
        form.resetForm();
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
        form.resetForm();
      }
    );
  }

  public onOpenModalRole(role: Role, mode: string) {
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.setAttribute('data-toggle', 'modal');
    button.type = 'button';
    button.style.display = 'none';


    if (mode === 'update') {
      this.role = role;
      button.setAttribute('data-target', '#updateRole')
    }

    if (mode === 'delete') { 
      this.roleId = role.id;
      button.setAttribute('data-target', '#deleteRole')
    }

    container.appendChild(button);
    button.click();
  }

  public onUpdateRole(role: Role) : void {
    const b = document.getElementById('update-role')!;
    b.click();
    this.clinixService.updateRole(role).subscribe(
      (response: Role)=>{
        this.getRoles();
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  public ondeleteRole(roleId?: number) : void {

    this.clinixService.deleteRole(roleId!).subscribe(
      (response: void)=>{
        this.getRoles();
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

}
