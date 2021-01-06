import { Component, OnInit } from '@angular/core';
import config from '../../config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Utils} from '../../utils/utils';
import {KanjiList} from '../../supportInterfaces/kanji.list';

@Component({
  selector: 'app-kanji-lists',
  templateUrl: './kanji-lists.component.html',
  styleUrls: ['./kanji-lists.component.css']
})
export class KanjiListsComponent implements OnInit {
  utils = Utils;
  loading = true;
  data: Array<KanjiList>;

  constructor(private http: HttpClient) { }

  getKanjiLists(): Observable<Array<KanjiList>>{
    return this.http.get<any>(`${config.apiUrl}/api/getKanjiLists`, {withCredentials: true});
  }

  ngOnInit(): void {
    this.getKanjiLists().subscribe((data: Array<KanjiList>) => {
      this.data = data;
      this.loading = false;
    });
  }
}
