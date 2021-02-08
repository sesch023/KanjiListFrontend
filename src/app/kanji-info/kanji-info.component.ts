import {Component, Input, OnInit} from '@angular/core';
import {Kanji} from '../../supportClasses/kanji';
import {Backend} from '../../backend/backend';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-kanji-info',
  templateUrl: './kanji-info.component.html',
  styleUrls: ['./kanji-info.component.css']
})
export class KanjiInfoComponent implements OnInit {
  @Input() kanjiID: string;
  @Input() kanji: Kanji;
  loading = true;
  meanings: string;
  onReadings: string;
  nanori: string;
  kunReadings: string;
  backend = Backend;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  setInfo(): void {
    this.meanings = this.kanji.meanings.join(', ');
    this.onReadings = this.kanji.onReadings.join(', ');
    this.kunReadings = this.kanji.kunReadings.join(', ');
    this.nanori = this.kanji.nanori.join(', ');
    this.loading = false;
  }

  ngOnInit(): void {
    if (!this.kanji){
      if (!this.kanjiID){
        this.kanjiID = this.route.snapshot.paramMap.get('id');
      }
      this.backend.getKanji(this.kanjiID, this.http).subscribe((kanji: Kanji) => {
        this.kanji = kanji;
        this.setInfo();
      });
    }
    else {
      this.kanjiID = this.kanji._id;
      this.setInfo();
    }
  }
}
