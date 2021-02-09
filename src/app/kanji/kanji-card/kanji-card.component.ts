import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import config from '../../../config';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Utils} from '../../../utils/utils';
import {KanjiCard} from '../../../supportClasses/kanji.card';
import {KeyValue} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {AlertService} from '../../misc/alertService/alert.service';
import {Backend} from '../../../backend/backend';

@Component({
  selector: 'app-kanji-card',
  templateUrl: './kanji-card.component.html',
  styleUrls: ['./kanji-card.component.css']
})
export class KanjiCardComponent implements OnInit {
  utils = Utils;
  loading = true;
  backend = Backend;
  areaDisabled = true;
  data: KanjiCard;
  levelOrder: Array<KeyValue<string, number>> = [];
  currentLevel: number;
  sourceURL: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private alertService: AlertService) {
    for (const key of Object.keys(config.vocabularyReverseLevels)) {
      this.levelOrder.push({key, value: config.vocabularyReverseLevels[key]});
    }
    this.levelOrder = this.levelOrder.sort((a, b) => a.value - b.value);
  }

  removeKanjiCard(): void {
    const dialogRef = this.utils.createRemoveDialog(this.dialog, 'Are you sure?');

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.backend.removeKanjiCard(this.data._id, this.http).subscribe(() => {
          this.router.navigate([this.sourceURL]);
          this.alertService.success('Card was removed!', false);
        });
      }
    });
  }

  updateKanjiCard(): void {
    this.backend.updateKanjiCard(this.data._id, this.data.learnedStatus, this.data.note, this.http).subscribe(() => {
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

  getData(cardID: string): void {
    this.backend.getKanjiCard(cardID, this.http).subscribe((data: KanjiCard) => {
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
    const cardID = this.route.snapshot.paramMap.get('id');
    this.sourceURL = this.route.snapshot.queryParamMap.get('sourceURL');
    this.getData(cardID);
  }
}
