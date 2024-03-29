import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormPerfilEducation } from './form-perfil-education.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComingSoonComponent } from '../../core/coming-soon/coming-soon.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-perfil-education',
  templateUrl: './form-perfil-education.component.html',
  styleUrls: [
    '../../shared/base-form/base-form.component.css',
    './form-perfil-education.component.css'
  ]
})
export class FormPerfilEducationComponent extends BaseFormComponent implements OnInit {
  formulario = new FormGroup({
    title: new FormControl('', [Validators.required]),
    academicType: new FormControl('', [Validators.required]),
    studyArea: new FormControl('', [Validators.required]),
    studyStartMonth: new FormControl('', [Validators.required]),
    studyStartYear: new FormControl('', [Validators.required]),
    studyEndMonth: new FormControl('', [Validators.required]),
    studyEndYear: new FormControl('', [Validators.required]),
    note: new FormControl('', [Validators.required]),
    activitiesGroups: new FormControl('', [Validators.nullValidator]),
    description: new FormControl('', [Validators.nullValidator]),
  });

  public anos: string[] = [];
  public meses: string[] = [];

  constructor(
    public dialog: MatDialog,
    private formPerfilEducation: FormPerfilEducation,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<FormPerfilEducationComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    super(dialogRef);
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.list();
    this.ConsultaEducation();
  }
  save() {
    if (this.formulario.valid) {
      this.formPerfilEducation.salvarEducation(this.formulario.value).subscribe(() => {
        this.notificationService.success("Added academic education!");
        this.formPerfilEducation.updatePerfilData(null);
        this.closeDialog();
      });
    } else {
      this.notificationService.error(
        'Please, fill in all required fields.'
      );
    }
  }

  list() {
    this.popularAnos();
    this.popularMeses();
  }

  ConsultaEducation() {
    this.formPerfilEducation.getEducation().subscribe((dados) => {
      this.popularFormulario(dados);
    });
  }

  popularMeses() {
    var meses: string[] =
      [
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
        'December'
      ];
    for (var item of meses) {
      this.meses.push(item);
    };
  }

  popularAnos() {
    this.anos.push('Year');
    for (let anoAtual = new Date().getFullYear();
      anoAtual >= 1900; anoAtual--) {
      this.anos.push(anoAtual.toString());
    };
  }

  popularFormulario(dados) {
    if (dados) {
      this.formulario.patchValue({
        title: dados.title || '',
        academicType: dados.academicType || '',
        studyArea: dados.studyArea || '',
        studyStartMonth: dados.studyStartMonth || '',
        studyStartYear: dados.studyEndYear || '',
        studyEndMonth: dados.studyEndMonth || '',
        studyEndYear: dados.studyEndYear || '',
        note: dados.note || '',
        activitiesGroups: dados.academicType || '',
        description: dados.description || '',
      });
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
