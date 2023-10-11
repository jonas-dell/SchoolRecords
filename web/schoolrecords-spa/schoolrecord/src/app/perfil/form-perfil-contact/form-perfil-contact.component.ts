import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-perfil-contact',
  templateUrl: './form-perfil-contact.component.html',
  styleUrls: [
    './form-perfil-contact.component.css',
    '../../shared/base-form/base-form.component.css',
  ]
})
export class FormPerfilContactComponent extends BaseFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FormPerfilContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    super(dialogRef);
  }

  ngOnInit(): void {
  }

  save() {
    alert('Salvar alguma coisa');
  }

  sites: any[] = [];

  adicionarCamposSites() {
    this.sites.push({ id: this.sites.length + 1 });
  }

  excluirCamposSite(indexSite: number) {
    this.sites.splice(indexSite, 1);
  }

  messages: any[] = [];

  adicionarCamposMessage() {
    this.messages.push({ id: this.messages.length + 1 });
  }

  excluirCamposMessage(indexMessage: number) {
    this.messages.splice(indexMessage, 1);
  }

}
