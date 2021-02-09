import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../misc/alertService/alert.service';
import {KanjiCard} from '../../../supportClasses/kanji.card';
import {Backend} from '../../../backend/backend';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {Kanji} from '../../../supportClasses/kanji';

@Component({
  selector: 'app-kanji-card-add',
  templateUrl: './kanji-card-add.component.html',
  styleUrls: ['./kanji-card-add.component.css']
})
export class KanjiCardAddComponent implements OnInit {
  listID: string;
  sourceURL: string;
  addKanjiForm: FormGroup;
  submitted = false;
  loading = false;
  backend = Backend;
  kanjiAddError: string;

  private http: HttpClient;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private httpBackend: HttpBackend,
    private httpGuarded: HttpClient,
    private router: Router) {
    // New HTTP Backend to pass Interceptors
    this.http = new HttpClient(httpBackend);
  }

  ngOnInit(): void {
    this.addKanjiForm = this.formBuilder.group({
      kanji: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(1)]]
    });
    this.listID = this.route.snapshot.paramMap.get('id');
    this.sourceURL = this.route.snapshot.queryParamMap.get('sourceURL');
  }

  onSubmit(): void {
    this.submitted = true;
    const val = this.addKanjiForm.controls.kanji.value;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.addKanjiForm.valid) {
      this.loading = true;
      this.kanjiAddError = null;
      this.backend.getKanji(val, this.http).subscribe(
        (data: Kanji) => {
          this.loading = false;
          this.backend.addKanjiCard(this.listID, val, this.httpGuarded).subscribe((addedID) => {
            this.router.navigate([`/kanjicards/${addedID}`], {queryParams: { sourceURL: this.sourceURL }});
          });
        },
        (error) => {
          this.loading = false;
          this.addKanjiForm.controls.kanji.setErrors({incorrect: true});
          this.kanjiAddError = 'The given value was not found in the Database!';
        }
      );
    }
  }
}
