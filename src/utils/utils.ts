import config from '../config';
import {formatDate} from '@angular/common';
import {ConfirmationDialogComponent} from '../app/confirmation-dialog/confirmation-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

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

  static shuffleArray(array: Array<any>): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  static isString(el: object): boolean {
    return typeof el === 'string' || el instanceof String;
  }

  static createRemoveDialog(dialog: MatDialog, text: string): MatDialogRef<ConfirmationDialogComponent> {
    return dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: text
    });
  }
}
