import { Component, OnInit } from '@angular/core';
import {forkJoin} from 'rxjs';
import {KanjiList} from '../../supportClasses/kanji.list';
import {Utils} from '../../utils/utils';
import {ActivatedRoute, Router} from '@angular/router';
import {Backend} from '../../backend/backend';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../alertService/alert.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-reapeat-list',
  templateUrl: './reapeat-list.component.html',
  styleUrls: ['./reapeat-list.component.css']
})
export class ReapeatListComponent implements OnInit {
  utils = Utils;
  loading = true;
  data: KanjiList;
  backend = Backend;
  repitionChain: Array<any> = [];
  repPoints: Array<number> = [];
  cardsUpdated = false;
  repetitionOver = false;
  currentCard = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    const listID = this.route.snapshot.paramMap.get('id');
    this.backend.getRepetitionList(listID, this.http).subscribe((repData: KanjiList) => {
      if (repData.kanjiCards.length === 0) {
        this.router.navigate(['/dashboard']);
        this.alertService.error('No cards to repeat in list!', false);
      } else {
        this.data = repData;
        for (let i = 0; i < this.data.kanjiCards.length; i++) {
          this.repPoints.push(0);
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
      this.repetitionOver = true;
      this.updateList();
    }
  }

  updateList(): void {
    const cardsUpdated = [];
    for (let i = 0; i < this.repPoints.length; i++){
      let learnedStatus = this.data.kanjiCards[i].learnedStatus + this.repPoints[i];
      learnedStatus = Math.round(learnedStatus * 10.0) / 10.0;
      if (learnedStatus > 1.0){
        learnedStatus = 1.0;
      }
      else if (learnedStatus < 0.0){
        learnedStatus = 0.0;
      }
      cardsUpdated.push(this.backend.updateKanjiCardRepeat(this.data.kanjiCards[i]._id, learnedStatus, this.http));
      console.log(cardsUpdated);
    }

    forkJoin(cardsUpdated).subscribe(() => {
      this.cardsUpdated = true;
    });
  }
}
