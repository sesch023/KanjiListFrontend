import {Component, Input, OnInit} from '@angular/core';
import {Kanji} from '../../supportInterfaces/kanji';
import {HttpClient} from '@angular/common/http';
import {Backend} from '../../backend/backend';

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
  backend = Backend;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.backend.getKanji(this.kanjiID, this.http).subscribe((kanji: Kanji) => {
      this.kanji = kanji;
      this.meanings = this.kanji.meanings.join(', ');
      this.onReadings = this.kanji.onReadings.join(', ');
      this.kunReadings = this.kanji.kunReadings.join(', ');
      this.loading = false;
    });
  }

}
