import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Kanji} from '../../../supportClasses/kanji';

/**
 * Buttons for a user to judge themself in the repeatlist.
 */
@Component({
  selector: 'app-repeat-list-card-result',
  templateUrl: './repeat-list-card-result.component.html',
  styleUrls: ['./repeat-list-card-result.component.css']
})
export class RepeatListCardResultComponent {
  @Input() kanji: Kanji;
  @Output() selfJudgedResultEvent = new EventEmitter<number>();

  constructor() { }

  /**
   * Emits self judge event.
   */
  selfJudge(value: number): void{
    this.selfJudgedResultEvent.emit(value);
  }
}
