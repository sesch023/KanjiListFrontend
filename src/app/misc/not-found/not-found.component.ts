import { Component } from '@angular/core';
import config from '../../../config';

/**
 * Simple not found component.
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  config = config;

  constructor() { }
}
