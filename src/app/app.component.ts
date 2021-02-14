import { Component } from '@angular/core';
import {AuthenticationService} from './auth/authService/auth.service';
import {Router} from '@angular/router';
import {AlertService} from './misc/alertService/alert.service';
import {first} from 'rxjs/operators';

/**
 * Main Component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KanjiListFrontend';
  currentUser: string;

  constructor(
     private authenticationService: AuthenticationService,
     private router: Router,
     private alertService: AlertService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  /**
   * Loggs out the user.
   */
  logout(): void {
    this.authenticationService.logout()
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
        });
  }
}
