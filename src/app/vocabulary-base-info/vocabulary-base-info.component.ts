import {Component, Input, OnInit} from '@angular/core';
import {Vocabulary} from '../../supportClasses/vocabulary';
import {Backend} from '../../backend/backend';
import {HttpClient} from '@angular/common/http';
import {Radical} from '../../supportClasses/radical';

@Component({
  selector: 'app-vocabulary-base-info',
  templateUrl: './vocabulary-base-info.component.html',
  styleUrls: ['./vocabulary-base-info.component.css']
})
export class VocabularyBaseInfoComponent implements OnInit {
  @Input() vocabulary: Vocabulary;
  @Input() vocabularyID: string;
  @Input() linked = true;
  translations: string;
  loading = true;
  backend = Backend;

  constructor(private http: HttpClient) { }

  setInfo(): void {
    this.translations = this.vocabulary.translations.join(', ');
    this.loading = false;
  }

  ngOnInit(): void {
    if (!this.vocabulary){
      this.backend.getVocabulary(this.vocabularyID, this.http).subscribe((vocabulary: Vocabulary) => {
        this.vocabulary = vocabulary;
        this.setInfo();
      });
    }
    else {
      this.vocabularyID = this.vocabulary._id;
      this.setInfo();
    }
  }
}
