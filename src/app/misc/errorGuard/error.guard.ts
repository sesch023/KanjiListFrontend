import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthenticationService} from '../../auth/authService/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../alertService/alert.service';

/**
 * Interceptor which checks for errors and executes different actions depending on the error.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private router: Router, private alertService: AlertService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      let error = err.statusText;

      if (err.error && err.error.message){
        error = err.error.message;
      }

      if (err.status === 401) {
        error = 'Sorry your authorization was unsuccessful. Please try again.';
        this.alertService.error(error, true);
        this.authenticationService.logout();
        this.router.navigate(['/login']);
      }
      else if (err.status === 404){
        error = 'Sorry, the Page was not found!';
        this.alertService.error(error, true);
        this.router.navigate(['/404']);
      }
      else if (err.status === 403){
        error = 'Sorry, the Page was forbidden!';
        this.alertService.error(error, true);
        this.router.navigate(['/404']);
      } else {
        this.alertService.error(error, false);
      }
      return throwError(error);
    }));
  }
}
