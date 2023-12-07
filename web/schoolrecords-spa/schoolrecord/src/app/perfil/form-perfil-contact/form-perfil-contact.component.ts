import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComingSoonComponent } from '../../core/coming-soon/coming-soon.component';
import { MatDialog } from '@angular/material/dialog';
import { FormPerfilService } from '../form-perfil/form-perfil.service';

@Component({
  selector: 'app-form-perfil-contact',
  templateUrl: './form-perfil-contact.component.html',
  styleUrls: [
    './form-perfil-contact.component.css',
    '../../shared/base-form/base-form.component.css',
  ],
})
export class FormPerfilContactComponent
  extends BaseFormComponent
  implements OnInit {
  formulario = new FormGroup({
    phoneNumber: new FormControl('', [Validators.nullValidator]),
    phoneType: new FormControl('', [Validators.nullValidator]),
    birthday: new FormControl('', [Validators.nullValidator]),
    birthdayMonth: new FormControl('', [Validators.nullValidator]),
    birthdayYear: new FormControl('', [Validators.nullValidator]),
    companyName: new FormControl('', [Validators.nullValidator]),
    jobType: new FormControl('', [Validators.nullValidator]),
  });

  public anos: string[] = [];
  public meses: string[] = [];
  public dias: string[] = [];
  public typePhones: string[] = [];
  public typeSites: string[] = [];
  public servicos: string[] = [];

  constructor(
    private formPerfilService: FormPerfilService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FormPerfilContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super(dialogRef);
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.popularMeses();
    this.popularDias();
    this.popularAnos();
    this.popularType();
    this.popularSites();
    this.popularServicos();
  }

  save() {
    this.formPerfilService.updatePerfilData(null);
    alert('Save something');
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

  popularType() {
    var typePhones: string[] = ['Please select', 'Home', 'Work', 'Mobile'];
    for (var item of typePhones) {
      this.typePhones.push(item);
    }
  }

  popularMeses() {
    var meses: string[] = [
      'Month',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    for (var item of meses) {
      this.meses.push(item);
    }
  }

  popularAnos() {
    this.anos.push('Year');
    for (
      let anoAtual = new Date().getFullYear();
      anoAtual >= 1900;
      anoAtual--
    ) {
      this.anos.push(anoAtual.toString());
    }
  }

  popularDias() {
    this.dias.push('Days');
    for (var i = 1; i <= 31; i++) {
      this.dias.push(i.toString());
    }
  }

  popularSites() {
    var typeSites: string[] = [
      'Personal',
      'Company',
      'Blog',
      'Portfólio',
      'Other',
    ];
    for (var item of typeSites) {
      this.typeSites.push(item);
    }
  }

  popularServicos() {
    var servicos: string[] = [
      'Skype',
      'ICQ',
      'Google Hangouts',
      'QG',
      'WeChat',
    ];
    for (var item of servicos) {
      this.servicos.push(item);
    }
  }

  comingSoon() {
    let dialogRef = this.dialog.open(ComingSoonComponent, {
      height: '300px',
      width: '300px',
      data: {},
    });
  }

}
