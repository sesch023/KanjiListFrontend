import {KanjiCard} from './kanji.card';

export class KanjiList {
  listName: string;
  createDate: string;
  _id: string;
  kanjiCards: Array<string|KanjiCard>;
}
