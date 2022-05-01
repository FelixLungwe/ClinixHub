import { ClinixServiceService } from './clinix-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClinixGuard implements CanActivate {


  constructor(private clinixService: ClinixServiceService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.clinixService.isLogged()) {
      return true;
    }
    else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
}
