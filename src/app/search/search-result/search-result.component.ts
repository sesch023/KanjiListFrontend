import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Backend} from '../../../backend/backend';
import {Kanji} from '../../../supportClasses/kanji';
import {Radical} from '../../../supportClasses/radical';
import {Vocabulary} from '../../../supportClasses/vocabulary';

/**
 * Component which for all defined search terms, loads the results for a given search term and filter doc.
 */
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  backend = Backend;
  searchFor: Array<string>;
  loading = true;
  paginations = [];
  searchTerm: string;
  filterDoc: string;

  result: {
    kanji: Array<Kanji>;
    radical: Array<Radical>;
    vocabulary: Array<Vocabulary>;
  } = {
    kanji: [],
    radical: [],
    vocabulary: []
  };

  constructor(private route: ActivatedRoute) { }

  /**
   * Inits the component.
   */
  ngOnInit(): void {
    const validSearchItems = Object.keys(this.result);
    this.searchTerm = this.route.snapshot.paramMap.get('term');
    const resultSearchString = this.route.snapshot.queryParamMap.get('resultSearch');
    const searchItem = validSearchItems.indexOf(resultSearchString);
    let filterDoc = this.route.snapshot.queryParamMap.get('filterDoc');

    if (!filterDoc){
      filterDoc = '{}';
    }
    this.filterDoc = filterDoc;

    if (searchItem === -1){
      this.searchFor = validSearchItems;
    }
    else {
      this.searchFor = [validSearchItems[searchItem]];
    }
  }
}
