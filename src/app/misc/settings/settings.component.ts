import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Utils} from '../../../utils/utils';
import {Backend} from '../../../backend/backend';
import {Router} from '@angular/router';
import {AlertService} from '../alertService/alert.service';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../auth/authService/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent{
  utils = Utils;
  backend = Backend;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private alertService: AlertService,
    private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  removeAccount(): void {
    const dialogRef = this.utils.createRemoveDialog(this.dialog, 'Are you sure?');

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.backend.removeAccount(this.http).subscribe(() => {
          this.authenticationService.logoutLocal();
          this.router.navigate(['/']);
          this.alertService.success('Account was removed!', false);
        });
      }
    });
  }

}
