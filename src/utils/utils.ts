/**
 * Util class for the application.
 */
import config from '../config';
import {formatDate} from '@angular/common';
import {ConfirmationDialogComponent} from '../app/dialog/confirmation-dialog/confirmation-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ListNameDialogComponent} from '../app/dialog/list-name-dialog/list-name-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';

export class Utils {
  /**
   * Convert a learned Status number with the config to a readable string.
   */
  static convertLearnedStatus(learnedStatus: number): string {
    const key = Math.floor(learnedStatus * 10) / 10;
    if (config.vocabularyLevels[key]){
      return config.vocabularyLevels[key];
    }
    else {
      return learnedStatus.toString();
    }
  }

  /**
   * Convert a date to a dd.mm.yyyy format.
   */
  static convertDate(date: string): string{
    return formatDate(date, 'dd.MM.yyyy', 'en-US');
  }

  /**
   * Shuffles an given Array in place.
   */
  static shuffleArray(array: Array<any>): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  /**
   * Checks if given argument is a string.
   */
  static isString(el: object): boolean {
    return typeof el === 'string' || el instanceof String;
  }

  /**
   * Creates a remove dialog.
   */
  static createRemoveDialog(dialog: MatDialog, text: string): MatDialogRef<ConfirmationDialogComponent> {
    return dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: text
    });
  }

  /**
   * Creates a name dialog.
   */
  static createNameDialog(dialog: MatDialog, text: string): MatDialogRef<ListNameDialogComponent> {
    return dialog.open(ListNameDialogComponent, {
      width: '400px',
      data: text
    });
  }

  /**
   * Reloads the page.
   */
  static reloadPage(router: Router, route: ActivatedRoute): void{
    router.routeReuseStrategy.shouldReuseRoute = () => false;
    router.onSameUrlNavigation = 'reload';
    router.navigate(['./'], { relativeTo: route });
  }
}
