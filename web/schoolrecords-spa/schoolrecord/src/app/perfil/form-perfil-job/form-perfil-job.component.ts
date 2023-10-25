import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { FormPerfilJobService } from './form-perfil-job.service';

@Component({
  selector: 'app-form-perfil-job',
  templateUrl: './form-perfil-job.component.html',
  styleUrls: [
    './form-perfil-job.component.css',
    '../../shared/base-form/base-form.component.css',
  ],
})
export class FormPerfilJobComponent
  extends BaseFormComponent
  implements OnInit
{
  formulario = new FormGroup({
    jobTitle: new FormControl('', [Validators.nullValidator]),
    jobType: new FormControl('', [Validators.nullValidator]),
    companyName: new FormControl('', [Validators.nullValidator]),
    companyLocation: new FormControl('', [Validators.nullValidator]),
    typeLocation: new FormControl('', [Validators.nullValidator]),
    checkboxJob: new FormControl(false, [Validators.nullValidator]),
    jobStartMonth: new FormControl('', [Validators.nullValidator]),
    jobStartYear: new FormControl('', [Validators.nullValidator]),
    jobEndMonth: new FormControl('', [Validators.nullValidator]),
    jobEndYear: new FormControl('', [Validators.nullValidator]),
    jobSector: new FormControl('', [Validators.nullValidator]),
    jobDescription: new FormControl('', [Validators.nullValidator]),
    jobTitlePerfil: new FormControl('', [Validators.nullValidator]),
  });

  public anos: string[] = [];
  public tipoDeEmprego: string[] = [];
  public tipoDeLocais: string[] = [];
  public meses: string[] = [];

  constructor(
    private formPerfilJob: FormPerfilJobService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<FormPerfilJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super(dialogRef);
  }

  ngOnInit() {
    this.list();
    this.consultaJobExperience();
  }

  list() {
    this.checkbox();
    this.popularAnos();
    this.popularTipoEmprego();
    this.popularLocalidade();
    this.popularMeses();
  }

  consultaJobExperience() {
    this.formPerfilJob.getJobExperience().subscribe((dados) => {
      this.popularFormulario(dados);
      this.checkbox();
    });
  }

  checkbox() {
    var hideContainer = document.getElementById('hide-container');
    var opacityMonth = document.getElementById('opacity-month');
    var opacityYear = document.getElementById('opacity-year');

    var checkboxJob = document.getElementById('check-job') as HTMLInputElement;

    const toggleVisibility = () => {
      if (checkboxJob.checked) {
        opacityMonth?.classList.add('opacity-job-true');
        opacityYear?.classList.add('opacity-job-true');
        hideContainer?.classList.remove('hide-job');

        this.formulario.get('jobEndYear')?.setValue('');
      } else {
        opacityMonth?.classList.remove('opacity-job-true');
        opacityYear?.classList.remove('opacity-job-true');
        hideContainer?.classList.add('hide-job');

        this.formulario.get('jobSector')?.setValue('');
      }
    };

    checkboxJob?.addEventListener('click', toggleVisibility);

    toggleVisibility();
  }

  save() {
    this.formPerfilJob.salvarJob(this.formulario.value).subscribe(() => {
      this.notificationService.success('Experiência adicionada!');
      this.closeDialog();
    });
  }

  popularTipoEmprego() {
    var empregos: string[] = [
      'Please select',
      'Full Time',
      'Part Time',
      'Self Employed',
      'Freelance',
      'Contract',
      'Internship',
      'Apprenticeship',
    ];
    for (var item of empregos) {
      this.tipoDeEmprego.push(item);
    }
  }
  popularLocalidade() {
    var locais: string[] = ['Please select', 'On-site', 'Hibrid', 'Remote'];
    for (var item of locais) {
      this.tipoDeLocais.push(item);
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

  popularFormulario(dados) {
    if (dados) {
      this.formulario.patchValue({
        jobTitle: dados.jobTitle || '',
        jobType: dados.jobType || '',
        companyName: dados.companyName || '',
        companyLocation: dados.companyLocation || '',
        typeLocation: dados.typeLocation || '',
        checkboxJob: dados.checkboxJob || '',
        jobStartMonth: dados.jobStartMonth || '',
        jobStartYear: dados.jobStartYear || '',
        jobEndMonth: dados.jobEndMonth || '',
        jobEndYear: dados.jobEndYear || '',
        jobSector: dados.jobSector || '',
        jobDescription: dados.jobDescription || '',
        jobTitlePerfil: dados.jobTitlePerfil || '',
      });
    }
  }
}
