import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../authService/auth.service';
import config from '../../config';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {}

  checkLoggedIn(): Observable<boolean> {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      return this.http.get<any>(`${config.apiUrl}/api/isLoggedIn`, {withCredentials: true});
    }
    else {
      return of(false);
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLoggedIn().pipe(map((data) => {
      if (data){
        return true;
      } else {
        this.authenticationService.logoutLocal();
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      }
    }));
  }
}
