import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { FormPerfilContactComponent } from '../form-perfil-contact/form-perfil-contact.component';
import { FormPerfilEducationComponent } from '../form-perfil-education/form-perfil-education.component';
import { FormPerfilJobComponent } from '../form-perfil-job/form-perfil-job.component';
import { PerfilService } from '../perfil.service';
import { ConsultaCepService } from './consulta-cep.service';
import { FormPerfilService } from './form-perfil.service';

@Component({
  selector: 'form-perfil',
  templateUrl: './form-perfil.component.html',
  styleUrls: [
    '../../shared/base-form/base-form.component.css',
    './form-perfil.component.css',
  ],
})
export class FormPerfilComponent extends BaseFormComponent implements OnInit {
  public academicEducations: string[] = [];
  public pronomes: string[] = [];
  public dadosAcademico: any;

  perfil = new FormGroup({
    id: new FormControl('', [Validators.nullValidator]),
    perfilName: new FormControl('', [Validators.required]),
    perfilLastName: new FormControl('', [Validators.required]),
    pronome: new FormControl('', [Validators.nullValidator]),
    about: new FormControl('', [Validators.required]),
    sector: new FormControl('', [Validators.nullValidator]),
    education: new FormControl('', [Validators.nullValidator]),
    country: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.nullValidator]),
    number: new FormControl('', [Validators.required]),
    complement: new FormControl('', [Validators.nullValidator]),
    neighborhood: new FormControl('', [Validators.nullValidator]),
    city: new FormControl('', [Validators.nullValidator]),
    state: new FormControl('', [Validators.nullValidator]),
  });

  constructor(
    private notificationService: NotificationService,
    private perfilService: PerfilService,
    private cepService: ConsultaCepService,
    private formPerfilService: FormPerfilService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FormPerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super(dialogRef);
  }

  ngOnInit(): void {
    this.getPerfil();
    this.popularFormacaoAcademica();
    this.popularPronomes();
  }

  save() {
    if (this.perfil.valid) {
      this.formPerfilService.salvarPerfil(this.perfil.value).subscribe(() => {
        this.notificationService.success('Profile saved successfully!');
        this.closeDialog();
      });
    } else {
      this.notificationService.error(
        'Please, fill in all required fields.'
      );
    }
  }

  getPerfil() {
    this.perfilService.getPerfil().subscribe((dados) => {
      this.populaDadosForm(dados);
    });
  }

  consultaCep() {
    let cep = this.perfil.get('zipCode')?.value;
    if (cep != null && cep !== '') {
      this.cepService.consultaCep(cep).subscribe((dados) => {
        this.populaDadosCep(dados);
        const numberInput = document.getElementById(
          'number'
        ) as HTMLInputElement;
        if (numberInput) {
          numberInput.focus();
        }
      });
    }
  }

  populaDadosForm(dados: any) {
    if (dados) {
      this.perfil.patchValue({
        id: dados.id || '',
        perfilName: dados.perfilName || '',
        perfilLastName: dados.perfilLastName || '',
        pronome: dados.pronome || '',
        about: dados.about || '',
        sector: dados.sector || '',
        education: dados.education || '',
        country: dados.country || '',
        zipCode: dados.zipCode || '',
        street: dados.street || '',
        number: dados.number || '',
        complement: dados.complement || '',
        neighborhood: dados.neighborhood || '',
        city: dados.city || '',
        state: dados.state || '',
      });
    }
  }

  populaDadosCep(dados) {
    if (dados) {
      this.perfil.patchValue({
        street: dados.logradouro || '',
        neighborhood: dados.bairro || '',
        city: dados.localidade || '',
        state: dados.uf || '',
      });
    }
  }

  editarPerfilEducation() {
    let dialogRef = this.dialog.open(FormPerfilEducationComponent, {
      height: '650px',
      width: '750px',
      data: {
        user: {
          id: 1,
          name: 'Jonas',
        },
      },
    });
  }

  editarPerfilJob() {
    let dialogRef = this.dialog.open(FormPerfilJobComponent, {
      height: '650px',
      width: '750px',
      data: {
        user: {
          id: 1,
          name: 'Jonas',
        },
      },
    });
  }

  editarPerfilContact() {
    let dialogRef = this.dialog.open(FormPerfilContactComponent, {
      height: '650px',
      width: '750px',
      data: {
        user: {
          id: 1,
          name: 'Jonas',
        },
      },
    });
  }

  popularFormacaoAcademica() {
    this.formPerfilService.getAcademicEducations().subscribe((dados) => {
      this.dadosAcademico = dados;
      if (this.dadosAcademico === null) {
        var formacaoAcademica: string[] = ['Please select'];
        for (var item of formacaoAcademica) {
          this.academicEducations.push(item);
        }
      } else {
        var formacaoAcademica: string[] = [
          'Please select',
          this.dadosAcademico.title,
        ];
        for (var item of formacaoAcademica) {
          this.academicEducations.push(item);
        }
      }
    });
  }

  popularPronomes() {
    var pronomes: string[] = [
      'Please select',
      'She/Her',
      'He/Him',
      'They/Them',
    ];
    for (var item of pronomes) {
      this.pronomes.push(item);
    }
  }
}
