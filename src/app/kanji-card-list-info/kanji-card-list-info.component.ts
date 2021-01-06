import {Component, Input, OnInit} from '@angular/core';
import {Utils} from '../../utils/utils';
import {Observable} from 'rxjs';
import {KanjiCard} from '../../supportInterfaces/kanji.card';
import config from '../../config';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-kanji-card-list-info',
  templateUrl: './kanji-card-list-info.component.html',
  styleUrls: ['./kanji-card-list-info.component.css']
})
export class KanjiCardListInfoComponent implements OnInit {
  @Input() id: string;
  @Input() kanjiCard: KanjiCard;
  loading = true;
  utils = Utils;
  router: Router;

  constructor(private http: HttpClient, router: Router) {
    this.router = router;
  }

  getKanjiCard(cardID: string): Observable<KanjiCard>{
    return this.http.get<any>(`${config.apiUrl}/api/getKanjiCard/${cardID}`, {withCredentials: true});
  }

  ngOnInit(): void {
    if (!this.kanjiCard) {
      this.getKanjiCard(this.id).subscribe((item) => {
        this.kanjiCard = item;
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }
}
