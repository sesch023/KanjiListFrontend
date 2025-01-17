import {Component, Input, OnInit} from '@angular/core';
import {Kanji} from '../../../supportClasses/kanji';
import {HttpClient} from '@angular/common/http';
import {Backend} from '../../../backend/backend';

/**
 * Component for showing basic information of a kanji.
 */
@Component({
  selector: 'app-kanji-base-info',
  templateUrl: './kanji-base-info.component.html',
  styleUrls: ['./kanji-base-info.component.css']
})
export class KanjiBaseInfoComponent implements OnInit {
  @Input() kanjiID: string;
  @Input() kanji: Kanji;
  @Input() linked = true;
  loading = true;
  meanings: string;
  onReadings: string;
  kunReadings: string;
  backend = Backend;

  constructor(private http: HttpClient) { }

  /**
   * Set the Basic information.
   */
  setInfo(): void {
    this.meanings = this.kanji.meanings.join(', ');
    this.onReadings = this.kanji.onReadings.join(', ');
    this.kunReadings = this.kanji.kunReadings.join(', ');
    this.loading = false;
  }

  /**
   * Inits the Basic info with either a kanji object or kanji id.
   */
  ngOnInit(): void {
    if (!this.kanji){
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
