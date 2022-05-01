import { ClinixServiceService } from './../clinix-service.service';
import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  public  fullname?: string;
  public photo?: string;
  public image: any;


  constructor(public clinixService: ClinixServiceService) { }

  ngOnInit(): void {

    let userName = localStorage.getItem('username');
        this.getUser(userName!);

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

   

}
