import { Component, OnInit } from '@angular/core';
import {Backend} from '../../backend/backend';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Vocabulary} from '../../supportClasses/vocabulary';

@Component({
  selector: 'app-vocabulary-info',
  templateUrl: './vocabulary-info.component.html',
  styleUrls: ['./vocabulary-info.component.css']
})
export class VocabularyInfoComponent implements OnInit {
  backend = Backend;
  vocabularyID: string;
  vocabulary: Vocabulary;
  loading = true;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.vocabularyID = this.route.snapshot.paramMap.get('id');
    this.backend.getVocabulary(this.vocabularyID, this.http).subscribe((vocabulary: Vocabulary) => {
      this.vocabulary = vocabulary;
      this.loading = false;
    });
  }
}
