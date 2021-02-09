import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthGuard} from '../authGuard/auth.guard';
import {AuthenticationService} from '../authService/auth.service';
import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class NotAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authGuard: AuthGuard
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authGuard.checkLoggedIn().pipe(map((data) => {
      if (!data){
        return true;
      } else {
        this.router.navigate(['/dashboard']);
        return false;
      }
    }));
  }
}
