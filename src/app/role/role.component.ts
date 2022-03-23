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
  public roleDelete?: Role | null;
  public roleUpdate?: Role | null;

  constructor(private clinixService: ClinixServiceService) { }

  ngOnInit(): void {
    this.getRoles();
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

  public onOpenModalRole(role:Role | null, mode: string) {
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.setAttribute('data-toggle', 'modal');
    button.type = 'button';
    button.style.display = 'none';


    if (mode === 'update') {
      this.roleUpdate = role;
      button.setAttribute('data-target', '#updateRole')
    }

    if (mode === 'delete') { 
      this.roleDelete = role;
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

  public onDeleteRole(roleId: any) : void {

    this.clinixService.deleteRole(roleId).subscribe(
      (response: void)=>{
        this.getRoles();
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

}
