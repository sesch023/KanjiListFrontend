import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../misc/alertService/alert.service';
import {Backend} from '../../../backend/backend';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  backend = Backend;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      passwordRepeat: [null, [Validators.required, Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]]
    }, {validators: this.passwordsEqual });
  }

  passwordsEqual(control: FormGroup): ValidationErrors | null {
    return control.get('password')?.value !== control.get('passwordRepeat')?.value ? { passwordsNotEqual: true } : null;
  }

  onSubmit(): void {
    this.submitted = true;
    this.alertService.clear();

    if (this.signupForm.valid) {
      this.loading = true;
      this.backend.signup(this.signupForm.controls.email.value, this.signupForm.controls.password.value, this.http)
        .subscribe(
          data => {
            this.router.navigate(['/']);
            this.alertService.success('The account was created. You need to validate your mail before logging in.');
          },
          error => {
            if (error === 'Conflict'){
              this.alertService.clear();
              this.alertService.error('The given mail is already taken!');
            }
            this.loading = false;
          });
    }
  }
}
