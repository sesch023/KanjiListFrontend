import {Component, Input, OnInit} from '@angular/core';
import {Radical} from '../../../supportClasses/radical';
import {Backend} from '../../../backend/backend';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-radical-base-info',
  templateUrl: './radical-base-info.component.html',
  styleUrls: ['./radical-base-info.component.css']
})
export class RadicalBaseInfoComponent implements OnInit {
  @Input() radicalID: string;
  @Input() radical: Radical;
  @Input() linked = true;
  meanings: string;
  loading = true;
  backend = Backend;

  constructor(private http: HttpClient) { }

  setInfo(): void {
    this.meanings = this.radical.meanings.join(', ');
    this.loading = false;
  }

  ngOnInit(): void {
    if (!this.radical){
      this.backend.getRadical(this.radicalID, this.http).subscribe((radical: Radical) => {
        this.radical = radical;
        this.setInfo();
      });
    }
    else {
      this.radicalID = this.radical._id;
      this.setInfo();
    }
  }
}
