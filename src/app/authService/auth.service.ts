import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import config from '../../config';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentUserMail')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): string {
    return this.currentUserSubject.value;
  }

  login(email, password): Observable<string> {
    return this.http.post<any>(`${config.apiUrl}/api/login`, { email, password })
      .pipe(map(() => {
        console.log(email);
        localStorage.setItem('currentUserMail', JSON.stringify(email));
        this.currentUserSubject.next(email);
        return email;
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUserMail');
    this.currentUserSubject.next(null);
  }
}
