import { User } from './../user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  public  fullname?: string;
  public photo?: string;

  constructor() { }

  ngOnInit(): void {
    this.fullname = localStorage.getItem('fullname')!;
    this.photo = localStorage.getItem('photo')!;
  }

  

}
