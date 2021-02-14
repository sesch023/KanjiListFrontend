import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../misc/alertService/alert.service';
import {Backend} from '../../../backend/backend';
import {HttpClient} from '@angular/common/http';

/**
 * Simple Component to call for validating a mail.
 */
@Component({
  selector: 'app-validatemail',
  templateUrl: './validatemail.component.html',
  styleUrls: ['./validatemail.component.css']
})
export class ValidatemailComponent implements OnInit {
  backend = Backend;

  constructor(private route: ActivatedRoute, private alertService: AlertService, private router: Router, private http: HttpClient) { }

  /**
   * Inits the mail validation component.
   */
  ngOnInit(): void {
    const email = this.route.snapshot.queryParamMap.get('email');
    const emailVerficationHash = this.route.snapshot.queryParamMap.get('emailVerificationHash');

    if (email && emailVerficationHash){
      this.backend.validateMail(email, emailVerficationHash, this.http).subscribe(
        (data) => {
          this.router.navigate(['/']);
          this.alertService.success('Mail validated. You can now login.');
        },
        (error) => {
          this.router.navigate(['/']);
          this.alertService.error('Not able to validate mail!');
        }
      );

    } else {
      this.router.navigate(['/']);
      this.alertService.error('Invalid Request');
    }
  }
}
