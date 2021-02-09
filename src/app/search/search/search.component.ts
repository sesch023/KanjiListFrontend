import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string;
  loading = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchTerm = this.route.snapshot.paramMap.get('term');
    this.loading = false;
  }
}
