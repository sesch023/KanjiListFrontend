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

/**
 * Base component of a repetition list.
 */
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
  repetitionChain: Array<any> = [];
  repPoints: Array<number> = [];
  cardsUpdated = false;
  repetitionOver = false;
  currentCard = 0;
  sourceURL: string;
  oldStati: Array<number> = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private alertService: AlertService) { }

  /**
   * Inits the component.
   */
  ngOnInit(): void {
    const listID = this.route.snapshot.paramMap.get('id');
    this.sourceURL = this.route.snapshot.queryParamMap.get('sourceURL');
    // Gets the repetition list.
    this.backend.getRepetitionList(listID, this.http).subscribe((repData: Array<KanjiCard>) => {
      // No Cards to repeat.
      if (repData.length === 0) {
        this.router.navigate(['/dashboard']);
        this.alertService.error('No cards to repeat in list!', false);
      } else {
        this.data = repData;
        // For every kanji card create a write and read card.
        for (let i = 0; i < this.data.length; i++) {
          this.oldStati.push(this.data[i].learnedStatus);
          this.repPoints.push(this.data[i].learnedStatus);
          this.repetitionChain.push([i, 'R']);
          this.repetitionChain.push([i, 'W']);
        }

        // Shuffle the list.
        this.utils.shuffleArray(this.repetitionChain);
        this.loading = false;
      }
    });
  }

  /**
   * Sets the next card in the repetitionChain and notes the points of the last one.
   */
  nextCard(result: number): void {
    this.repPoints[this.repetitionChain[this.currentCard][0]] += result;

    this.currentCard += 1;
    if (this.currentCard >= this.repetitionChain.length){
      this.normalizeRepPoints();
      this.repetitionOver = true;
    }
  }

  /**
   * Normalizes the points after the repetition, so that they lie between 0.0 and 1.0.
   */
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

  /**
   * Updates the list after the repetition.
   */
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

  /**
   * Returns to source or dashboard after repetition.
   */
  returnFromRep(): void {
    if (this.sourceURL){
      this.router.navigate([this.sourceURL]);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
