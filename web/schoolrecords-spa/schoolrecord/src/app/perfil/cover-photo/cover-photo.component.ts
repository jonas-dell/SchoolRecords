import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PerfilDataService } from 'src/app/shared/services/perfil-data.service';
import { ConvertBase64 } from 'src/app/shared/services/perfil-data-utils.service';
import { CoverPhotoService } from './cover-photo.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-cover-photo',
  templateUrl: './cover-photo.component.html',
  styleUrls: [
    './cover-photo.component.css',
    '../../shared/base-form/base-form.component.css',
  ],
})
export class CoverPhotoComponent extends BaseFormComponent implements OnInit {
  dados: any;
  selectedFile: File;

  constructor(
    private perfilDataService: PerfilDataService,
    private convertBase64: ConvertBase64,
    private coverPhotoService: CoverPhotoService,
    private notificationService: NotificationService,
    private sharedService: SharedService,

    public dialogRef: MatDialogRef<CoverPhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super(dialogRef);
  }

  ngOnInit() {
    this.getPerfilData();
  }

  getPerfilData() {
    const token = localStorage.getItem('token');
    this.perfilDataService.getPerfil().subscribe(
      (dados) => {
        this.dados = dados;
        this.dados.imagem = this.convertBase64.converterBase64ParaImagem(
          this.dados.imagem
        );
      },
      (error) => {
        console.error('Erro ao buscar dos dados da API', error);
      }
    );
  }

  fileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.dados.imagem = e.target.result; //e.target.result - converter em base64.
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  save() {
    if (this.selectedFile) {
      this.coverPhotoService.atualizarImagem(this.selectedFile).subscribe(
        (response) => {
          this.notificationService.success('Image saved successfully!');
          this.sharedService.updateImage();
          this.getPerfilData();
          this.dialogRef.close();
        },
        (error) => {
          this.notificationService.error('Erro ao salvar a imagem.');
        }
      );
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
