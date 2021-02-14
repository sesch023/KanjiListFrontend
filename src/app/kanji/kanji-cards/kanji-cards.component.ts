import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import config from '../../../config';
import {Utils} from '../../../utils/utils';
import {KanjiCard} from '../../../supportClasses/kanji.card';

/**
 * Component for showing all kanji cards of a user.
 */
@Component({
  selector: 'app-kanji-cards',
  templateUrl: './kanji-cards.component.html',
  styleUrls: ['./kanji-cards.component.css']
})
export class KanjiCardsComponent implements OnInit {
  utils = Utils;
  loading = true;
  data: Array<KanjiCard>;

  constructor(private http: HttpClient) { }

  /**
   * Get all Kanji cards.
   */
  getKanjiCards(): Observable<Array<object>>{
    return this.http.get<any>(`${config.apiUrl}/api/getKanjiCards`, {withCredentials: true});
  }

  /**
   * Init the component.
   */
  ngOnInit(): void {
    this.getKanjiCards().subscribe((data: Array<KanjiCard>) => {
      this.data = data;
      this.loading = false;
    });
  }
}
