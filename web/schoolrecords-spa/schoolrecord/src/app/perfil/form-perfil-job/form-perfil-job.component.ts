import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  NgForm,
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
  @ViewChild('meuFormulario', { static: false }) formulario: NgForm; 
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
  }
  ngOnInit() {
    this.meuFormulario = this.fb.group({
      jobTitle: ['', [Validators.required]],
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
      jobTitlePerfil: ['', [Validators.required]],
      skills: this.fb.array([]), 
    });
    this.list();
  }

  list() {
    this.checkbox();
    this.popularAnos();
    this.popularTipoEmprego();
    this.popularLocalidade();
    this.popularMeses();
    // this.consultaJobExperience();
  }

  // consultaJobExperience() {
  //   this.formPerfilJob.getJobExperience().subscribe((dados) => {
  //     this.popularFormulario(dados);
  //     this.checkbox();
  //   });
  // }

  checkbox() {
    const checkboxJob = this.meuFormulario.get('checkboxJob');
    var hideContainer = document.getElementById('hide-container');  //Sector
    var opacityMonth = document.getElementById('opacity-month');
    var opacityYear = document.getElementById('opacity-year');

    checkboxJob!.valueChanges.subscribe((value) => {
      const opacityMonth = document.getElementById('opacity-month');
      const opacityYear = document.getElementById('opacity-year');
      const hideContainer = document.getElementById('hide-container');

      if (value) {
        opacityMonth?.classList.add('opacity-job-true');
        opacityYear?.classList.add('opacity-job-true');
        hideContainer?.classList.remove('hide-job');

        this.meuFormulario.get('jobEndYear')?.setValue('');
      } else {
        opacityMonth?.classList.remove('opacity-job-true');
        opacityYear?.classList.remove('opacity-job-true');
        hideContainer?.classList.add('hide-job');

        this.meuFormulario.get('jobSector')?.setValue('');
      }
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

  // popularFormulario(dados) {
  //   if (dados) {
  //     this.formulario.patchValue({
  //       jobTitle: dados.jobTitle || '',
  //       jobType: dados.jobType || '',
  //       companyName: dados.companyName || '',
  //       companyLocation: dados.companyLocation || '',
  //       typeLocation: dados.typeLocation || '',
  //       checkboxJob: dados.checkboxJob || '',
  //       jobStartMonth: dados.jobStartMonth || '',
  //       jobStartYear: dados.jobStartYear || '',
  //       jobEndMonth: dados.jobEndMonth || '',
  //       jobEndYear: dados.jobEndYear || '',
  //       jobSector: dados.jobSector || '',
  //       jobDescription: dados.jobDescription || '',
  //       jobTitlePerfil: dados.jobTitlePerfil || '',
  //     });
  //   }
  // }

 

  meuFormulario!: FormGroup;
  skill = new FormControl([]);


  adicionarSkill() {
    const novaSkill = this.fb.control('',[Validators.required]);
    (this.meuFormulario.get('skills') as FormArray).push(novaSkill);
  }

  excluirCamposSkills(index: number) {
    (this.meuFormulario.get('skills') as FormArray).removeAt(index);
  }

  get skills() {
    return (this.meuFormulario.get('skills') as FormArray).controls;
  }

  save() {
    console.log(this.meuFormulario.valid);
    if(this.meuFormulario.valid){
      console.log(this.meuFormulario.value);
      const valoresSkills = this.meuFormulario.value.skills;
      console.log(valoresSkills);
      this.formPerfilJob.salvarJob(this.meuFormulario.value).subscribe(() => {
        this.notificationService.success('Experiência adicionada!');
        // this.closeDialog();
      });
    }else {
      this.notificationService.error(
        'Por favor, preencha todos os campos obrigatórios.'
      );
    }
  }
}
