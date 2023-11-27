import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: [
    './view-pdf.component.css',
    '../shared/base-form/base-form.component.css',
  ]
})
export class ViewPdfComponent extends BaseFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super(dialogRef);
  }

  ngOnInit(): void {}

  edit() {}

}
