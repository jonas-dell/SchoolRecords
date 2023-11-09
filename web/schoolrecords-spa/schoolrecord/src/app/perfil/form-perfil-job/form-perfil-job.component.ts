import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
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
  formulario: FormGroup;

  public anos: string[] = [];
  public tipoDeEmprego: string[] = [];
  public tipoDeLocais: string[] = [];
  public meses: string[] = [];

  constructor(
    private formPerfilJob: FormPerfilJobService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormPerfilJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super(dialogRef);
    this.formulario = this.fb.group({
      jobTitle: ['', [Validators.nullValidator]],
      jobType: ['', [Validators.nullValidator]],
      companyName: ['', [Validators.nullValidator]],
      companyLocation: ['', [Validators.nullValidator]],
      typeLocation: ['', [Validators.nullValidator]],
      checkboxJob: [false, [Validators.nullValidator]],
      jobStartMonth: ['', [Validators.nullValidator]],
      jobStartYear: ['', [Validators.nullValidator]],
      jobEndMonth: ['', [Validators.nullValidator]],
      jobEndYear: ['', [Validators.nullValidator]],
      jobSector: ['', [Validators.nullValidator]],
      jobDescription: ['', [Validators.nullValidator]],
      jobTitlePerfil: ['', [Validators.nullValidator]],
      skills: this.fb.array([]),
    });
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
    console.log(this.formulario.value);
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

  private adicionarSkill() {
    const newSkill = this.fb.control('');
    (this.formulario.get('skills') as FormArray).push(newSkill);
  }

  private excluirSkill(indexSkill: number) {
    (this.formulario.get('skills') as FormArray).removeAt(indexSkill);
  }

  skills: any[] = [];
  adicionarCamposSkills() {
    this.adicionarSkill();
    this.skills.push({ id: this.skills.length + 1 });
  }

  excluirCamposSkills(indexSkill: number) {
    this.excluirSkill(indexSkill);
    this.skills.splice(indexSkill, 1);
  }
}
