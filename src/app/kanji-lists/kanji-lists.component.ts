import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Utils} from '../../utils/utils';
import {KanjiList} from '../../supportInterfaces/kanji.list';
import {Backend} from '../../backend/backend';
import {Router} from '@angular/router';
import {AlertService} from '../alertService/alert.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-kanji-lists',
  templateUrl: './kanji-lists.component.html',
  styleUrls: ['./kanji-lists.component.css']
})
export class KanjiListsComponent implements OnInit {
  utils = Utils;
  loading = true;
  data: Array<KanjiList>;
  backend = Backend;

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService, private dialog: MatDialog) { }

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

  addKanjiList(): void {
    this.backend.addKanjiList('New List', this.http).subscribe((listID) => {
      this.router.navigate([`/kanjilists/${listID}`]);
    });
  }

  getData(): void {
    this.loading = true;
    this.backend.getKanjiLists(this.http).subscribe((data: Array<KanjiList>) => {
      this.data = data;
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
