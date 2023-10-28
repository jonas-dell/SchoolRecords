import { Component, Inject, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoverPhotoService, ImageUpdateService } from './cover-photo.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ConvertBase64 } from 'src/app/shared/services/perfil-data-utils.service';

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
  constructor(
    private notificationService: NotificationService,
    private coverPhotoService: CoverPhotoService,
    private convertBase64: ConvertBase64,
    private imageUpdateService: ImageUpdateService,
    public dialogRef: MatDialogRef<CoverPhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super(dialogRef);
  }

  ngOnInit(){
    this.getPerfilData();

    this.imageUpdateService.imageUpdated$.subscribe(() => {
      this.getPerfilData();
    });
  }

  save() {
    if(this.dados.image){
      this.notificationService.success('Imagem de capa atualizada com sucesso.');
      this.closeDialog();
    }else{
      this.notificationService.error('Erro ao atualizar a imagem de capa.');
    }
  }

  

  getPerfilData() {
    const token = localStorage.getItem('token');
    this.coverPhotoService.getPerfil().subscribe(
      (dados) => {
        this.dados = dados;
        this.dados.image = this.convertBase64.converterBase64ParaImagem(
          this.dados.imagem
        );
      },
      (error) => {
        console.error('Erro ao buscar os dados da API:', error);
      }
    );
  }

  fileChanged(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.coverPhotoService.uploadImagem(selectedFile).subscribe((response) => {
        this.dados.imagem = response; 
        this.imageUpdateService.updateImage();
      });
    }
  }
}
