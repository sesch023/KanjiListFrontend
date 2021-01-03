import { Component, OnInit } from '@angular/core';
import config from '../../config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-kanji-lists',
  templateUrl: './kanji-lists.component.html',
  styleUrls: ['./kanji-lists.component.css']
})
export class KanjiListsComponent implements OnInit {
  loading = true;
  data: Array<object>;

  constructor(private http: HttpClient) { }

  getKanjiLists(): Observable<Array<object>>{
    return this.http.get<any>(`${config.apiUrl}/api/getKanjiLists`, {withCredentials: true});
  }

  ngOnInit(): void {
    this.getKanjiLists().subscribe((data: Array<object>) => {
      this.data = data;
      this.loading = false;
    });
  }
}
