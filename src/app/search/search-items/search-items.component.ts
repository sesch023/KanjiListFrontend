import {Component, Input, OnInit} from '@angular/core';
import {Backend} from '../../../backend/backend';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../../misc/alertService/alert.service';
import {SearchResultComponent} from '../search-result/search-result.component';
import {Vocabulary} from '../../../supportClasses/vocabulary';
import {Kanji} from '../../../supportClasses/kanji';
import {Radical} from '../../../supportClasses/radical';
import {min} from 'rxjs/operators';

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
  @Input() searchTerm: string;
  @Input() filterDoc = '{}';
  @Input() sliceLow = this.DEFAULT_SLICE_LOW;
  @Input() sliceHigh = this.DEFAULT_SLICE_HIGH;
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

  nextPage(sliceLow: number, sliceHigh: number): void {
    this.sliceHigh = sliceHigh;
    this.sliceLow = sliceLow;
    this.initSearch();
  }

  getMaxPage(): number{
    return Math.min(this.sliceHigh, this.result.length);
  }

  initSearch(): void {
    this.backend.search(this.searchTerm, this.filterDoc, [this.searchFor], this.sliceLow, this.sliceHigh, this.http).subscribe(
      (item) => {
          this.result = item[this.searchFor];
          this.currentPagination = 0;
          for (let k = 0; k < this.result.length; k += this.DEFAULT_PAGINATION){
            if (this.loading){
              this.paginations.push(k);
            }

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
