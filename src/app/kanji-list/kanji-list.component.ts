import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import config from '../../config';
import {ActivatedRoute} from '@angular/router';

interface KanjiList {
  listName: string;
  createDate: string;
  _id: string;
  kanjiCards: Array<string>;
}

@Component({
  selector: 'app-kanji-list',
  templateUrl: './kanji-list.component.html',
  styleUrls: ['./kanji-list.component.css']
})
export class KanjiListComponent implements OnInit {
  loading = true;
  data: KanjiList;
  cards: Array<any>;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.cards = [];
  }

  getKanjiList(listID: string): Observable<KanjiList>{
    return this.http.get<any>(`${config.apiUrl}/api/getKanjiList/${listID}`, {withCredentials: true});
  }

  getKanjiCard(cardID: string): Observable<object>{
    return this.http.get<any>(`${config.apiUrl}/api/getKanjiCard/${cardID}`, {withCredentials: true});
  }

  isString(el: object): boolean {
    return typeof el === 'string' || el instanceof String;
  }

  ngOnInit(): void {
    const listID = this.route.snapshot.paramMap.get('id');
    this.getKanjiList(listID).subscribe((data: KanjiList) => {
      console.log(data);
      this.data = data;
      this.data.kanjiCards.forEach(element => {
         this.cards.push(element);
      });
      this.loading = false;

      for (let i = 0; i < this.cards.length; i++){
        this.getKanjiCard(this.data.kanjiCards[i]).subscribe((item) => {
          this.cards[i] = item;
        });
      }
    });
  }
}
