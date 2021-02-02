import { Component, OnInit } from '@angular/core';
import {KanjiCard} from '../../supportClasses/kanji.card';
import {KanjiList} from '../../supportClasses/kanji.list';
import {Utils} from '../../utils/utils';
import {ActivatedRoute, Router} from '@angular/router';
import {Backend} from '../../backend/backend';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../alertService/alert.service';
import {MatDialog} from '@angular/material/dialog';

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

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    const listID = this.route.snapshot.paramMap.get('id');
    this.backend.getRepetitionList(listID, this.http).subscribe((repData: KanjiList) => {
      if (repData.kanjiCards.length === 0){
        this.router.navigate(['/dashboard']);
        this.alertService.error('No cards to repeat in list!', false);
      } else {
        this.data = repData;
        this.utils.shuffleArray(this.data.kanjiCards);
        this.loading = false;
      }
    });
  }

}
