import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Utils} from '../../../utils/utils';
import {KanjiList} from '../../../supportClasses/kanji.list';
import {Backend} from '../../../backend/backend';
import {Router} from '@angular/router';
import {AlertService} from '../../misc/alertService/alert.service';
import {MatDialog} from '@angular/material/dialog';
import {KanjiCard} from '../../../supportClasses/kanji.card';

/**
 * Component for showing kanji lists.
 */
@Component({
  selector: 'app-kanji-lists',
  templateUrl: './kanji-lists.component.html',
  styleUrls: ['./kanji-lists.component.css']
})
export class KanjiListsComponent implements OnInit {
  utils = Utils;
  loading = true;
  data: Array<KanjiList>;
  listDue: Array<number> = [];
  router: Router;
  backend = Backend;

  constructor(private http: HttpClient, router: Router, private alertService: AlertService, private dialog: MatDialog) {
    this.router = router;
  }

  /**
   * Removes the Kanjilist with a dialog.
   */
  removeKanjiList(id: string): void {
    const dialogRef = this.utils.createRemoveDialog(this.dialog, 'Are you sure?');

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.backend.removeKanjiList(id, this.http).subscribe(() => {
          this.alertService.success('List was removed!', false);
          this.getData();
        });
      }
    });
  }

  /**
   * Adds a kanji list.
   */
  addKanjiList(): void {
    this.backend.addKanjiList('New List', this.http).subscribe((listID) => {
      this.router.navigate([`/kanjilists/${listID}`]);
    });
  }

  /**
   * Gets the Data of the KanjiLists.
   */
  getData(): void {
    this.loading = true;
    this.backend.getKanjiLists(this.http).subscribe((data: Array<KanjiList>) => {
      for (let i = 0; i < data.length; i++){
        this.listDue.push(null);
        this.backend.getRepetitionList(data[i]._id, this.http).subscribe((repData: Array<KanjiCard>) => {
          this.listDue[i] = repData.length;
        });
      }
      this.data = data;
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
