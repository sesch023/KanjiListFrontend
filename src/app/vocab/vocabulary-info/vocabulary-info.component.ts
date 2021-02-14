import { Component, OnInit } from '@angular/core';
import {Backend} from '../../../backend/backend';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Vocabulary} from '../../../supportClasses/vocabulary';
import {VocabularyType} from '../../../supportClasses/kanji.enums';

/**
 * Component for complex vocabulary information.
 */
@Component({
  selector: 'app-vocabulary-info',
  templateUrl: './vocabulary-info.component.html',
  styleUrls: ['./vocabulary-info.component.css']
})
export class VocabularyInfoComponent implements OnInit {
  backend = Backend;
  vocabularyID: string;
  vocabulary: Vocabulary;
  vocabType = '-';
  loading = true;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  /**
   * Inits the component.
   */
  ngOnInit(): void {
    this.vocabularyID = this.route.snapshot.paramMap.get('id');
    this.backend.getVocabulary(this.vocabularyID, this.http).subscribe((vocabulary: Vocabulary) => {
      this.vocabulary = vocabulary;
      if (this.vocabulary.type) {
        this.vocabType = VocabularyType[this.vocabulary.type];
        console.log(this.vocabulary.type);
      }
      this.loading = false;
    });
  }
}
