import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Kanji} from '../../../supportClasses/kanji';
import {Backend} from '../../../backend/backend';
import {HttpClient} from '@angular/common/http';

/**
 * A single card of a repetition list which is either in write or read mode.
 */
@Component({
  selector: 'app-repeat-list-card',
  templateUrl: './repeat-list-card.component.html',
  styleUrls: ['./repeat-list-card.component.css']
})
export class RepeatListCardComponent implements OnInit {
  @Input() kanjiID: string;
  @Input() writeMode = false;
  @Output() selfJudgedResultEvent = new EventEmitter<number>();
  backend = Backend;
  repetition = true;
  meanings: string;
  kanji: Kanji;
  loading = true;

  constructor(private http: HttpClient) { }

  /**
   * Inits the card.
   */
  ngOnInit(): void {
    this.backend.getKanji(this.kanjiID, this.http).subscribe(value => {
      this.kanji = value;
      this.meanings = this.kanji.meanings.join(', ');
      this.loading = false;
    });
  }

  /**
   * Shows the info of the card.
   */
  showInfo(): void{
    this.repetition = false;
  }

  /**
   * Emits the self judged event after the user judged himself.
   */
  selfJudge(value: number): void{
    this.selfJudgedResultEvent.emit(value);
  }
}
