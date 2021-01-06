import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import config from '../../config';
import {ActivatedRoute, Router} from '@angular/router';
import {KanjiList} from '../../supportInterfaces/kanji.list';

@Component({
  selector: 'app-kanji-list',
  templateUrl: './kanji-list.component.html',
  styleUrls: ['./kanji-list.component.css']
})
export class KanjiListComponent implements OnInit {
  loading = true;
  data: KanjiList;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  getKanjiList(listID: string): Observable<KanjiList>{
    return this.http.get<any>(`${config.apiUrl}/api/getKanjiList/${listID}`, {withCredentials: true});
  }

  ngOnInit(): void {
    const listID = this.route.snapshot.paramMap.get('id');
    this.getKanjiList(listID).subscribe((data: KanjiList) => {
      this.data = data;
      this.loading = false;
    });
  }
}
