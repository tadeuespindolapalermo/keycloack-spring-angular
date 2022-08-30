import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class SignupGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {

  }
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginService.getIsLogged()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  
}
