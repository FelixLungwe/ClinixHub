import { ClinixServiceService } from './clinix-service.service';
import { User } from './user';
import {Component, OnInit} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
   helper = new JwtHelperService();

  constructor(private clinixService: ClinixServiceService, private router: Router){}

  ngOnInit(): void {
  }
  
  
}
