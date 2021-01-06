import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthenticationService} from '../authService/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../alertService/alert.service';


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
        this.alertService.error(error, true);
        this.authenticationService.logout();
        error = 'Authorization unsuccessful. Please try again.';
        this.router.navigate(['/login']);
      }
      else if (err.status === 404){
        this.alertService.error(error, true);
        error = 'Page not found!';
        this.router.navigate(['/']);
      } else {
        this.alertService.error(error, false);
      }
      return throwError(error);
    }));
  }
}
