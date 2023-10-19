import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { FormPerfilEducationComponent } from '../form-perfil-education/form-perfil-education.component';
import { FormPerfilJobComponent } from '../form-perfil-job/form-perfil-job.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsultaCepService } from './consulta-cep.service';
import { FormPerfilService } from './form-perfil.service';
import { FormPerfilContactComponent } from '../form-perfil-contact/form-perfil-contact.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { PerfilService } from '../perfil.service';

@Component({
  selector: 'form-perfil',
  templateUrl: './form-perfil.component.html',
  styleUrls: [
    '../../shared/base-form/base-form.component.css',
    './form-perfil.component.css',
  ],
})
export class FormPerfilComponent extends BaseFormComponent implements OnInit {
  perfil = new FormGroup({
    perfilName: new FormControl('',[Validators.nullValidator]),
    perfilLastName: new FormControl('',[Validators.nullValidator]),
    sector: new FormControl('',[Validators.nullValidator]),
    education: new FormControl('',[Validators.nullValidator]),
    country: new FormControl('',[Validators.nullValidator]),
    zipCode: new FormControl('',[Validators.nullValidator]),
    street: new FormControl('',[Validators.nullValidator]),
    number: new FormControl('',[Validators.nullValidator]),
    complement: new FormControl('',[Validators.nullValidator]),
    neighborhood: new FormControl('',[Validators.nullValidator]),
    city: new FormControl('',[Validators.nullValidator]),
    state: new FormControl('',[Validators.nullValidator]),
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
    const token = localStorage.getItem('token');
    this.ConsultaPerfil();
  }
  save() {
    this.formPerfilService.salvarPerfil(this.perfil.value).subscribe(() => {
      this.notificationService.success('Perfil salvo com sucesso!');
      this.closeDialog();
    });
  }

  ConsultaPerfil(){
    this.perfilService.getPerfil()
      .subscribe((dados) => {
        this.populaDadosForm(dados);
      }); 
  }

  consultaCep() {
    let cep = this.perfil.get('zipCode')?.value;
    if (cep != null && cep !== '') {
      this.cepService.consultaCep(cep).
        subscribe((dados) => {
        this.populaDadosCep(dados);
        const numberInput = document.getElementById('number') as HTMLInputElement;
        if (numberInput) {
          numberInput.focus();
        }
      });
    }
  }

  populaDadosForm(dados){
    if(dados){
      this.perfil.patchValue({
        perfilName: dados.perfilName || '',
        perfilLastName: dados.perfilLastName || '',
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
        state: dados.uf || ''
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
}
