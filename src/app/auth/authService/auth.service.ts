import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { map } from 'rxjs/operators';
import config from '../../../config';
import {CookieService} from 'ngx-cookie-service';

/**
 * Authentication Service, which can login or logout a user.
 */
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.currentUserSubject = new BehaviorSubject<string>(this.cookieService.get('currentUserMail'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Observable on the logged in state of the user.
   */
  public get currentUserValue(): string {
    return this.currentUserSubject.value;
  }

  /**
   * Log a user in with the given mail and password via the backend.
   */
  login(email, password): Observable<string> {
    if (!this.currentUserValue) {
      return this.http.post<any>(`${config.apiUrl}/api/login`, {email, password}, {withCredentials: true})
        .pipe(map(() => {
          this.cookieService.set('currentUserMail', email, { expires: 2, sameSite: 'Strict' });
          this.currentUserSubject.next(email);
          return email;
        }));
    } else {
      return throwError('The User is already logged in!');
    }
  }

  /**
   * Logs a user out with the frontend cookies only.
   */
  logoutLocal(): void {
    this.cookieService.delete('currentUserMail');
    this.cookieService.deleteAll();
    this.currentUserSubject.next(null);
  }

  /**
   * Logs a user out with the backend.
   */
  logout(): Observable<void> {
    if (this.currentUserValue) {
      return this.http.post<any>(`${config.apiUrl}/api/logout`, {}, {withCredentials: true})
        .pipe(map(() => {
          this.logoutLocal();
          return;
        }));
    } else {
      return throwError('The User is not logged in!');
    }
  }
}
