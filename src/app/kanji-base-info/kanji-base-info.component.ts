import {Component, Input, OnInit} from '@angular/core';
import {Kanji} from '../../supportInterfaces/kanji';
import {Observable} from 'rxjs';
import config from '../../config';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-kanji-base-info',
  templateUrl: './kanji-base-info.component.html',
  styleUrls: ['./kanji-base-info.component.css']
})
export class KanjiBaseInfoComponent implements OnInit {
  @Input() kanjiID: string;
  loading = true;
  kanji: Kanji;
  meanings: string;
  onReadings: string;
  kunReadings: string;

  constructor(private http: HttpClient) { }

  getKanji(kanji: string): Observable<Kanji> {
    return this.http.get<any>(`${config.apiUrl}/api/kanjiinfo/${kanji}`, {withCredentials: true});
  }

  ngOnInit(): void {
    this.getKanji(this.kanjiID).subscribe((kanji: Kanji) => {
      this.kanji = kanji;
      this.meanings = this.kanji.meanings.join(', ');
      this.onReadings = this.kanji.onReadings.join(', ');
      this.kunReadings = this.kanji.kunReadings.join(', ');
      this.loading = false;
    });
  }

}
