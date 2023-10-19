import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cover-photo',
  templateUrl: './cover-photo.component.html',
  styleUrls: [
    './cover-photo.component.css',
    '../../shared/base-form/base-form.component.css'
  ]
})
export class CoverPhotoComponent extends BaseFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CoverPhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
      super(dialogRef);
   }

  ngOnInit(): void {
  }

  save() {
    alert('Salvar alguma coisa');
  }

}
