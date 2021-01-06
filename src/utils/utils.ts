import config from '../config';
import {formatDate} from '@angular/common';

export class Utils {
  static convertLearnedStatus(learnedStatus: number): string {
    const key = Math.floor(learnedStatus * 10) / 10;
    if (config.vocabularyLevels[key]){
      return config.vocabularyLevels[key];
    }
    else {
      return learnedStatus.toString();
    }
  }

  static convertDate(date: string): string{
    return formatDate(date, 'dd.MM.yyyy', 'en-US');
  }

  static isString(el: object): boolean {
    return typeof el === 'string' || el instanceof String;
  }
}
