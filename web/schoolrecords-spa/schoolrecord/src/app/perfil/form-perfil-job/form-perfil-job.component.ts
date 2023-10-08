import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-perfil-job',
  templateUrl: './form-perfil-job.component.html',
  styleUrls: [
    './form-perfil-job.component.css',
    '../../shared/base-form/base-form.component.css',
  ]
})
export class FormPerfilJobComponent extends BaseFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FormPerfilJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    super(dialogRef);
  }

  ngOnInit(): void {
    
    var checkboxJob = document.getElementById("check-job");

    checkboxJob?.addEventListener("click", function() {
      var hideContainer = document.getElementById("hide-container");
      var opacityMonth = document.getElementById("opacity-month")
      var opacityYear = document.getElementById("opacity-year");

      hideContainer?.classList.toggle("hide-job");
      opacityMonth?.classList.toggle("opacity-job-false");
      opacityYear?.classList.toggle("opacity-job-false");
    })
  }

  save() {
    alert('Salvar alguma coisa');
  }

}
