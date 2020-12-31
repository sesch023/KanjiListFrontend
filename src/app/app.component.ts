import { Component } from '@angular/core';
import {AuthenticationService} from './authService/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KanjiListFrontend';
  authenticationService: AuthenticationService;
  constructor(
     authenticationService: AuthenticationService,
  ) {
    this.authenticationService = authenticationService;
  }
}
