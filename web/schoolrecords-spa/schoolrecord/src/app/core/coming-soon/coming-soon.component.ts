import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormPerfilContactComponent } from 'src/app/perfil/form-perfil-contact/form-perfil-contact.component';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css']
})
export class ComingSoonComponent extends BaseFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FormPerfilContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super(dialogRef);
  }

  ngOnInit(): void {
  }
}
