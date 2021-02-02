import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Utils} from '../../utils/utils';
import {KanjiCard} from '../../supportClasses/kanji.card';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Backend} from '../../backend/backend';
import {MatDialog} from '@angular/material/dialog';
import {AlertService} from '../alertService/alert.service';

@Component({
  selector: 'app-kanji-card-list-info',
  templateUrl: './kanji-card-list-info.component.html',
  styleUrls: ['./kanji-card-list-info.component.css']
})
export class KanjiCardListInfoComponent implements OnInit {
  backend = Backend;
  @Input() id: string;
  @Input() kanjiCard: KanjiCard;
  @Output() cardRemoved = new EventEmitter();
  loading = true;
  utils = Utils;
  router: Router;

  constructor(private http: HttpClient, router: Router, private dialog: MatDialog, private alertService: AlertService) {
    this.router = router;
  }

  removeKanjiCard(): void {
    const dialogRef = this.utils.createRemoveDialog(this.dialog, 'Are you sure?');

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.backend.removeKanjiCard(this.kanjiCard._id, this.http).subscribe(() => {
          this.cardRemoved.emit();
          this.alertService.success('Card was removed!', false);
        });
      }
    });
  }

  ngOnInit(): void {
    if (!this.kanjiCard) {
      this.backend.getKanjiCard(this.id, this.http).subscribe((item) => {
        this.kanjiCard = item;
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }
}
