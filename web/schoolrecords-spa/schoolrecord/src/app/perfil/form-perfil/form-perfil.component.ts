import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { FormPerfilEducationComponent } from '../form-perfil-education/form-perfil-education.component';
import { FormPerfilJobComponent } from '../form-perfil-job/form-perfil-job.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  perfil = new FormGroup({
    perfilName: new FormControl('',[Validators.nullValidator]),
    perfilLastName: new FormControl('',[Validators.nullValidator]),
    sector: new FormControl('',[Validators.nullValidator]),
    checkboxEducation: new FormControl('',[Validators.nullValidator]),
    country: new FormControl('',[Validators.nullValidator]),
    zipCode: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.nullValidator]),
    number: new FormControl('',[Validators.nullValidator]),
    complement: new FormControl('',[Validators.nullValidator]),
    neighborhood: new FormControl('',[Validators.nullValidator]),
    city: new FormControl('',[Validators.nullValidator]),
    state: new FormControl('',[Validators.nullValidator]),
  });

  constructor(
    private cepService: ConsultaCepService,
    private formPerfilService: FormPerfilService,  
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FormPerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super(dialogRef);
  }

  ngOnInit(): void {
    console.log('Dado que chegou da outra tela', this.data);
  }

  save() {
    this.formPerfilService.salvarPerfil(this.perfil.value)
        .subscribe(x=> {
          console.log("Sucesso!!!");
        });
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

  cepDataFilled = false; // Variável para rastrear se os dados do CEP foram preenchidos

  consultaCep() {
    let cep = this.perfil.get('zipCode')?.value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCep(cep)?.subscribe((dados) => {
        this.populaDadosForm(dados);
        this.cepDataFilled = true; // Define a variável para indicar que os dados do CEP foram preenchidos
      });
    }
  }

  populaDadosForm(dados) {
    console.log(dados);
    if (dados) {
      this.perfil.patchValue({
        address: dados.logradouro || '',
        neighborhood: dados.bairro || '',
        city: dados.localidade || '',
        state: dados.uf || ''
      });

      //this.dialogRef.close(this.perfil.value); // Fecha o diálogo após o preenchimento dos dados do CEP
    }
  }
}
