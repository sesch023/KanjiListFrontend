import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import config from '../../config';

@Component({
  selector: 'app-kanji-cards',
  templateUrl: './kanji-cards.component.html',
  styleUrls: ['./kanji-cards.component.css']
})
export class KanjiCardsComponent implements OnInit {
  loading = true;
  data: Array<object>;

  constructor(private http: HttpClient) { }

  getKanjiCards(): Observable<Array<object>>{
    return this.http.get<any>(`${config.apiUrl}/api/getKanjiCards`, {withCredentials: true});
  }

  ngOnInit(): void {
    this.getKanjiCards().subscribe((data: Array<object>) => {
      this.data = data;
      this.loading = false;
    });
  }
}
