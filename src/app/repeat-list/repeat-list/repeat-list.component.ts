import { Component, OnInit } from '@angular/core';
import {forkJoin} from 'rxjs';
import {KanjiList} from '../../../supportClasses/kanji.list';
import {Utils} from '../../../utils/utils';
import {ActivatedRoute, Router} from '@angular/router';
import {Backend} from '../../../backend/backend';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../../misc/alertService/alert.service';
import {Observable} from 'rxjs';
import {KanjiCard} from '../../../supportClasses/kanji.card';

@Component({
  selector: 'app-reapeat-list',
  templateUrl: './repeat-list.component.html',
  styleUrls: ['./repeat-list.component.css']
})
export class RepeatListComponent implements OnInit {
  utils = Utils;
  loading = true;
  data: Array<KanjiCard>;
  backend = Backend;
  repitionChain: Array<any> = [];
  repPoints: Array<number> = [];
  cardsUpdated = false;
  repetitionOver = false;
  currentCard = 0;
  sourceURL: string;
  oldStati: Array<number> = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    const listID = this.route.snapshot.paramMap.get('id');
    this.sourceURL = this.route.snapshot.queryParamMap.get('sourceURL');
    this.backend.getRepetitionList(listID, this.http).subscribe((repData: Array<KanjiCard>) => {
      if (repData.length === 0) {
        this.router.navigate(['/dashboard']);
        this.alertService.error('No cards to repeat in list!', false);
      } else {
        this.data = repData;
        for (let i = 0; i < this.data.length; i++) {
          this.oldStati.push(this.data[i].learnedStatus);
          this.repPoints.push(this.data[i].learnedStatus);
          this.repitionChain.push([i, 'R']);
          this.repitionChain.push([i, 'W']);
        }

        this.utils.shuffleArray(this.repitionChain);
        this.loading = false;
      }
    });
  }

  nextCard(result: number): void {
    this.repPoints[this.repitionChain[this.currentCard][0]] += result;

    this.currentCard += 1;
    if (this.currentCard >= this.repitionChain.length){
      this.normalizeRepPoints();
      this.repetitionOver = true;
    }
  }

  normalizeRepPoints(): void {
    for (let i = 0; i < this.repPoints.length; i++){
      if (this.repPoints[i] > 1.0){
        this.repPoints[i] = 1.0;
      }
      else if (this.repPoints[i] < 0.0){
        this.repPoints[i] = 0.0;
      }

      this.repPoints[i] = Math.round(this.repPoints[i] * 10.0) / 10.0;
    }
  }

  updateList(): void {
    const cardsUpdated = [];
    for (let i = 0; i < this.repPoints.length; i++){
      cardsUpdated.push(this.backend.updateKanjiCardRepeat(this.data[i]._id, this.repPoints[i], this.http));
    }

    forkJoin(cardsUpdated).subscribe(() => {
      this.cardsUpdated = true;
      this.returnFromRep();
    });
  }

  returnFromRep(): void {
    if (this.sourceURL){
      this.router.navigate([this.sourceURL]);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
