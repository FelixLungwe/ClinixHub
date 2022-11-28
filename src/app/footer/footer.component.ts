import { Component, OnInit } from '@angular/core';
import { Produit } from '../produit';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private produits!: Produit[];
  private produit!: Produit;

  constructor() { }

  ngOnInit(): void {
  }

}
