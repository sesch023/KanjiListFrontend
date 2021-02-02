import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Backend} from '../../backend/backend';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {Kanji} from '../../supportClasses/kanji';
import {Radical} from '../../supportClasses/radical';
import {Vocabulary} from '../../supportClasses/vocabulary';
import {AlertService} from '../alertService/alert.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  backend = Backend;
  searchFor: Array<string>;
  loading = true;

  result: {
    kanji: Array<Kanji>;
    radical: Array<Radical>;
    vocabulary: Array<Vocabulary>;
  } = {
    kanji: [],
    radical: [],
    vocabulary: []
  };

  constructor(private route: ActivatedRoute, private http: HttpClient, private alertService: AlertService) { }

  ngOnInit(): void {
    const validSearchItems = Object.keys(this.result);
    const searchTerm = this.route.snapshot.paramMap.get('term');
    const resultSearchString = this.route.snapshot.queryParamMap.get('resultSearch');
    const searchItem = validSearchItems.indexOf(resultSearchString);
    let filterDoc = this.route.snapshot.queryParamMap.get('filterDoc');

    if (!filterDoc){
      filterDoc = '{}';
    }

    if (searchItem === -1){
      this.searchFor = validSearchItems;
    }
    else {
      this.searchFor = [validSearchItems[searchItem]];
    }

    const observables: Observable<any>[] = [];
    for (const item of this.searchFor) {
      observables.push(this.backend.search(searchTerm, filterDoc, [item], this.http));
    }

    forkJoin(observables).subscribe(
      (item) => {
        for (let i = 0; i < this.searchFor.length; i++) {
          this.result[validSearchItems[i]] = item[i][validSearchItems[i]];
        }
        console.log(this.result);
        console.log(item);
      },
      (err) => {
        this.alertService.error('Error while searching. Please try again.');
      },
      () => {
        this.loading = false;
      }
    );
  }
}
