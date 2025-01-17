import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

/**
 * Simple search form which is validated.
 */
@Component({
  selector: 'app-search-form-top',
  templateUrl: './search-form-top.component.html',
  styleUrls: ['./search-form-top.component.css']
})
export class SearchFormTopComponent implements OnInit {
  @Input() startValue = '';
  searchFormTop: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  /**
   * Init the form.
   */
  ngOnInit(): void {
    this.searchFormTop = this.formBuilder.group({
      searchInput: [null, [Validators.required, Validators.minLength(1)]],
    });
  }

  /**
   * Search form is submitted.
   */
  onSubmit(): void {
    this.submitted = true;

    if (this.searchFormTop.valid) {
      this.loading = true;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/search', this.searchFormTop.controls.searchInput.value]).then(() => {
        this.loading = false;
      });
    }
  }
}
