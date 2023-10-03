import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-perfil-education',
  templateUrl: './form-perfil-education.component.html',
  styleUrls: [
    '../../shared/base-form/base-form.component.css',
    './form-perfil-education.component.css'
  ]
})
export class FormPerfilEducationComponent extends BaseFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FormPerfilEducationComponent>,
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
