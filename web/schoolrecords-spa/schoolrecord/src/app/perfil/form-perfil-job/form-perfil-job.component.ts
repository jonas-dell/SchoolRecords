import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-perfil-job',
  templateUrl: './form-perfil-job.component.html',
  styleUrls: [
    './form-perfil-job.component.css',
    '../../shared/base-form/base-form.component.css',
  ]
})
export class FormPerfilJobComponent extends BaseFormComponent implements OnInit {
  formulario = new FormGroup({
    jobTitle: new FormControl('', [Validators.nullValidator]),
    jobType: new FormControl('', [Validators.nullValidator]),
    companyName: new FormControl('', [Validators.nullValidator]),
    companyLocation: new FormControl('', [Validators.nullValidator]),
    typeLocation: new FormControl('', [Validators.nullValidator]),
    checkboxJob: new FormControl('', [Validators.nullValidator]),
    jobStartMonth: new FormControl('', [Validators.nullValidator]),
    jobStartYear: new FormControl('', [Validators.nullValidator]),
    jobEndMonth: new FormControl('', [Validators.nullValidator]),
    jobEndYear: new FormControl('', [Validators.nullValidator]),
    jobSector: new FormControl('', [Validators.nullValidator]),
    jobDescription: new FormControl('', [Validators.nullValidator]),
    jobTitlePerfil: new FormControl('', [Validators.nullValidator])
  });
  
  public anos: number[] = [];
  
  

  constructor(
    public dialogRef: MatDialogRef<FormPerfilJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    super(dialogRef);
  }

  ngOnInit(){
    
    var checkboxJob = document.getElementById("check-job");

    checkboxJob?.addEventListener("click", function() {
      var hideContainer = document.getElementById("hide-container");
      var opacityMonth = document.getElementById("opacity-month")
      var opacityYear = document.getElementById("opacity-year");

      hideContainer?.classList.toggle("hide-job");
      opacityMonth?.classList.toggle("opacity-job-false");
      opacityYear?.classList.toggle("opacity-job-false");
    });
  
    this.popularAnos();    

  }

  save() {
    alert('Salvar alguma coisa');
  }


  popularAnos(){
    const anosAtual = new Date().getFullYear();
    for (let ano = 1920; ano<=anosAtual; ano++){
      this.anos.push(ano);
    }
  }
  
}
