import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import config from '../../config';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Utils} from '../../utils/utils';
import {KanjiCard} from '../../supportInterfaces/kanji.card';
import {Kanji} from '../../supportInterfaces/kanji';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-kanji-card',
  templateUrl: './kanji-card.component.html',
  styleUrls: ['./kanji-card.component.css']
})
export class KanjiCardComponent implements OnInit {
  utils = Utils;
  loading = true;
  areaDisabled = true;
  data: KanjiCard;
  levelOrder: Array<KeyValue<string, number>> = [];
  currentLevel: number;
  sourceURL: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    for (const key of Object.keys(config.vocabularyReverseLevels)) {
      this.levelOrder.push({key, value: config.vocabularyReverseLevels[key]});
    }
    this.levelOrder = this.levelOrder.sort((a, b) => a.value - b.value);
  }

  getKanjiCard(cardID: string): Observable<KanjiCard> {
    return this.http.get<any>(`${config.apiUrl}/api/getKanjiCard/${cardID}`, {withCredentials: true});
  }

  updateKanjiCard(): void {
    this.http.put<any>(`${config.apiUrl}/api/updateKanjiCard/${this.data._id}?learnedStatus=${this.data.learnedStatus}`,
      {note: this.data.note}, {withCredentials: true}).subscribe(() => {
        this.getData(this.data._id);
    });
  }

  setLevel(newLevel: number): void {
    if (newLevel >= 0 && newLevel < this.levelOrder.length) {
      this.currentLevel = newLevel;
      this.data.learnedStatus = this.levelOrder[this.currentLevel].value;
      this.updateKanjiCard();
    }
  }

  lowerLevel(): void {
    this.setLevel(this.currentLevel - 1);
  }

  higherLevel(): void {
    this.setLevel(this.currentLevel + 1);
  }

  focusNote(): void {
    this.areaDisabled = false;
  }

  saveNote(): void {
    this.areaDisabled = true;
    this.updateKanjiCard();
  }

  getData(listID: string): void {
    this.getKanjiCard(listID).subscribe((data: KanjiCard) => {
      this.data = data;
      const status = this.utils.convertLearnedStatus(this.data.learnedStatus);
      for (let i = 0; i < this.levelOrder.length; i++) {
        if (this.levelOrder[i].key === status) {
          this.currentLevel = i;
          break;
        }
      }
      this.loading = false;
    });
  }

  ngOnInit(): void {
    const listID = this.route.snapshot.paramMap.get('id');
    this.sourceURL = this.route.snapshot.queryParamMap.get('sourceURL');
    this.getData(listID);
  }
}
