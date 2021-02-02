import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {KanjiList} from '../../supportClasses/kanji.list';
import {Backend} from '../../backend/backend';
import {AlertService} from '../alertService/alert.service';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Utils} from '../../utils/utils';
import {KanjiCard} from '../../supportClasses/kanji.card';

@Component({
  selector: 'app-kanji-list',
  templateUrl: './kanji-list.component.html',
  styleUrls: ['./kanji-list.component.css']
})
export class KanjiListComponent implements OnInit {
  loading = true;
  data: KanjiList;
  listDueNum: number = null;
  router: Router;
  backend = Backend;
  utils = Utils;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    router: Router,
    private alertService: AlertService,
    private dialog: MatDialog) {
    this.router = router;
  }

  removeKanjiList(): void {
    const dialogRef = this.utils.createRemoveDialog(this.dialog, 'Are you sure?');

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.backend.removeKanjiList(this.data._id, this.http).subscribe(() => {
          this.router.navigate(['/kanjilists']);
          this.alertService.success('List was removed!', false);
        });
      }
    });
  }

  getData(): void {
    const listID = this.route.snapshot.paramMap.get('id');
    this.backend.getKanjiList(listID, this.http).subscribe((data: KanjiList) => {
      this.backend.getRepetitionList(listID, this.http).subscribe((repData: KanjiList) => {
        this.listDueNum = repData.kanjiCards.length;
      });
      this.data = data;
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  onCardRemoved(): void {
    this.getData();
  }
}
