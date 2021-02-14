import {Component, Input, OnInit} from '@angular/core';
import {Backend} from '../../../backend/backend';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../../misc/alertService/alert.service';
import {Vocabulary} from '../../../supportClasses/vocabulary';
import {Kanji} from '../../../supportClasses/kanji';
import {Radical} from '../../../supportClasses/radical';

/**
 * Displays search items after a search in the backend.
 */
@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.css']
})
export class SearchItemsComponent implements OnInit {
  DEFAULT_SLICE_LOW = 0;
  DEFAULT_SLICE_HIGH = 25;
  DEFAULT_PAGINATION = this.DEFAULT_SLICE_HIGH - this.DEFAULT_SLICE_LOW;

  backend = Backend;
  // String to search for
  @Input() searchTerm: string;
  // Used filter document
  @Input() filterDoc = '{}';
  // Low slice of the search
  @Input() sliceLow = this.DEFAULT_SLICE_LOW;
  // High slice of the search
  @Input() sliceHigh = this.DEFAULT_SLICE_HIGH;
  // Category to search for
  @Input() searchFor: string;
  result: {
    data: Array<Vocabulary|Kanji|Radical>,
    length: number
  };
  paginations = [];
  currentPagination = 0;
  loading = true;

  constructor(private http: HttpClient, private alertService: AlertService) { }

  ngOnInit(): void {
    this.initSearch();
  }

  /**
   * Sets next page and reinits search for the next pagination.
   */
  nextPage(sliceLow: number, sliceHigh: number): void {
    this.sliceHigh = sliceHigh;
    this.sliceLow = sliceLow;
    this.initSearch();
  }

  /**
   * Max number of items.
   */
  getMaxPage(): number{
    return Math.min(this.sliceHigh, this.result.length);
  }

  /**
   * Inits a new search with the current instance variables.
   */
  initSearch(): void {
    this.backend.search(this.searchTerm, this.filterDoc, [this.searchFor], this.sliceLow, this.sliceHigh, this.http).subscribe(
      (item) => {
          // Sets the data
          this.result = item[this.searchFor];
          this.currentPagination = 0;
          for (let k = 0; k < this.result.length; k += this.DEFAULT_PAGINATION){
            // Prepares the paginations.
            if (this.loading){
              this.paginations.push(k);
            }
            // Finds the current pagination slice.
            if (this.sliceLow > k){
              this.currentPagination += 1;
            }
          }
          this.loading = false;
        },
        (err) => {
          this.alertService.error('Error while searching. Please try again.');
        });
  }
}
