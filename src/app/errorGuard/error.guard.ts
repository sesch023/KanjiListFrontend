import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthenticationService} from '../authService/auth.service';
import {Router} from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      let error = err.error.message || err.statusText;
      if (err.status === 401) {
        this.authenticationService.logout();
        error = 'Login unsuccessful. Please try again.';
        this.router.navigate(['login']);
      }
      return throwError(error);
    }));
  }
}
