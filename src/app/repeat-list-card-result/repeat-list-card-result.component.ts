import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Kanji} from '../../supportClasses/kanji';

@Component({
  selector: 'app-repeat-list-card-result',
  templateUrl: './repeat-list-card-result.component.html',
  styleUrls: ['./repeat-list-card-result.component.css']
})
export class RepeatListCardResultComponent implements OnInit {
  @Input() kanji: Kanji;
  @Output() selfJudgedResultEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  selfJudge(value: number): void{
    this.selfJudgedResultEvent.emit(value);
  }
}
