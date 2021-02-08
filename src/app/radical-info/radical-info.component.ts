import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Radical} from '../../supportClasses/radical';
import {Backend} from '../../backend/backend';
import {Kanji} from '../../supportClasses/kanji';

@Component({
  selector: 'app-radical-info',
  templateUrl: './radical-info.component.html',
  styleUrls: ['./radical-info.component.css']
})
export class RadicalInfoComponent implements OnInit {
  backend = Backend;
  radicalID: string;
  radical: Radical;
  loading = true;
  kanji: Array<Kanji>;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.radicalID = this.route.snapshot.paramMap.get('id');
    this.backend.getRadical(this.radicalID, this.http).subscribe((radical: Radical) => {
      this.radical = radical;
      this.backend.getKanjiWithRadical(this.radicalID, this.http).subscribe((kanji) => {
        this.kanji = kanji;
        this.loading = false;
      });
    });
  }
}
