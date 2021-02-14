/**
 * Class for a kanji.
 */
import {GradeLevel, JLPTLevel} from './kanji.enums';

export class Kanji {
  _id: string;
  meanings: Array<string>;
  nanori: Array<string>;
  onReadings: Array<string>;
  kunReadings: Array<string>;
  strokes: number;
  radical: string;
  jlptLevel: JLPTLevel;
  gradeLevel: GradeLevel;
  frequencyOfUse: number;
  lookalikes: Array<string>;
  parts: Array<string>;
  strokeOrder: string;
  gyousho: string;
  sampleVocabulary: Array<string>;
  learnedByModel: boolean;
}
