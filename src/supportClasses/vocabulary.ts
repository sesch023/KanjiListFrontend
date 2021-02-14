/**
 * Class for vocabulary.
 */
import {JLPTLevel, VocabularyType} from './kanji.enums';

export class Vocabulary {
  _id: string;
  translations: Array<string>;
  vocab: string;
  kanaReading: string;
  pitchAccent: string;
  jlptLevel: JLPTLevel;
  type: VocabularyType;
}
