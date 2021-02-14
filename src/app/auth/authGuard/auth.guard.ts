import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../authService/auth.service';
import config from '../../../config';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AlertService} from '../../misc/alertService/alert.service';

/**
 * AuthGuard, which can check if a user is logged in before activating a route.
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private alertService: AlertService
  ) {}

  /**
   * Check if user is logged in.
   */
  checkLoggedIn(): Observable<boolean> {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser  && currentUser.length > 0) {
      return this.http.get<any>(`${config.apiUrl}/api/isLoggedIn`, {withCredentials: true});
    }
    else {
      return of(false);
    }
  }

  /**
   * Check if the user can activate the route.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLoggedIn().pipe(map((data) => {
      if (data){
        return true;
      } else {
        this.authenticationService.logoutLocal();
        this.alertService.error('Authorization unsuccessful. Please try again.', true);
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      }
    }));
  }
}
