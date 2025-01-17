import { Component, Inject, OnInit  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
 * A Material Dialog for entering a list name.
 */
@Component({
  selector: 'app-list-name-dialog',
  templateUrl: './list-name-dialog.component.html',
  styleUrls: ['./list-name-dialog.component.css']
})
export class ListNameDialogComponent implements OnInit {
  result = '';
  form: FormGroup;
  submitted = false;

  constructor(public dialog: MatDialogRef<ListNameDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public message: string,
              private formBuilder: FormBuilder) { }

  /**
   * Inits the dialog.
   */
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [this.result, [Validators.required]]
    });
  }

  /**
   * The save button is pressed.
   */
  save(): void {
    this.submitted = true;
    if (this.form.valid){
      this.dialog.close(this.form.value.name);
    }
  }

  /**
   * The close button is pressed.
   */
  onNoClick(): void {
    this.dialog.close();
  }
}
