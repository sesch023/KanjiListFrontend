import {Component, Input, OnInit} from '@angular/core';
import {Kanji} from '../../../supportClasses/kanji';
import {Backend} from '../../../backend/backend';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {GradeLevel} from '../../../supportClasses/kanji.enums';
import {KanjiList} from '../../../supportClasses/kanji.list';
import config from '../../../config';

/**
 * Complex dictionary info of a kanji.
 */
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
  kanjiLists: Array<KanjiList>;
  gradeLevel = '-';
  backend = Backend;
  config = config;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  /**
   * Adds the kanji to a given list id.
   */
  addToList(listID: string): void {
    this.backend.addKanjiCard(listID, this.kanji._id, this.http).subscribe(() => {
      this.router.navigate([`/kanjilists/${listID}`]);
    });
  }

  /**
   * Sets the info of the kanji.
   */
  setInfo(): void {
    this.meanings = this.kanji.meanings.join(', ');
    this.onReadings = this.kanji.onReadings.join(', ');
    this.kunReadings = this.kanji.kunReadings.join(', ');
    this.nanori = this.kanji.nanori.join(', ');
    if (this.kanji.gradeLevel){
      this.gradeLevel = GradeLevel[this.kanji.gradeLevel];
    }
    this.loading = false;
  }

  /**
   * Inits the kanji info.
   */
  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    if (!this.kanji){
      if (!this.kanjiID){
        this.kanjiID = this.route.snapshot.paramMap.get('id');
      }
      this.backend.getKanji(this.kanjiID, this.http).subscribe((kanji: Kanji) => {
        this.kanji = kanji;
        this.backend.getKanjiLists(this.http).subscribe(kanjiLists => {
          this.kanjiLists = kanjiLists;
          this.setInfo();
        });
      });
    }
    else {
      this.kanjiID = this.kanji._id;
      this.setInfo();
    }
  }
}
