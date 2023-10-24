import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormPerfilComponent } from './form-perfil/form-perfil.component';
import { NotificationService } from '../shared/services/notification.service';
import { ConvertBase64 } from '../shared/services/perfil-data-utils.service';
import { PerfilDataService } from '../shared/services/perfil-data.service';
import { CoverPhotoComponent } from './cover-photo/cover-photo.component';
import { FormPerfilService } from './form-perfil/form-perfil.service';
import { FormPerfilJobService } from './form-perfil-job/form-perfil-job.service';
import { FormPerfilEducation } from './form-perfil-education/form-perfil-education.service';

export class Perfil {
 
}

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  dados: any;
  formJob: any;
  formEducation: any;
  perfil = new Perfil(); 
  file: File | null = null;

  constructor(
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private perfilService: PerfilDataService,
    private formPerfilJobService: FormPerfilJobService,
    private formPerfilEducation: FormPerfilEducation,
    private convertBase64: ConvertBase64,
    ){ }
     

  ngOnInit(): void {
    this.getPerfilData();
    this.getJobExperience();
    this.getEducation();
    let fileButtonContainer = document.getElementById('button-file-container');
    let file = document.getElementById('file-img-input');
    fileButtonContainer?.addEventListener('click', () => {
      file?.click();
    });
  }

  getPerfilData(){
    const token = localStorage.getItem('token');
    this.perfilService.getPerfil().
    subscribe((dados) => {
      this.dados = dados;
      this.dados.foto = this.convertBase64.converterBase64ParaImagem(this.dados.foto);
    },
     (error) => {
      console.error("Erro ao buscar dados da API:", error);
      }
    );
  }

  getJobExperience(){
    this.formPerfilJobService.getJobExperience().
      subscribe((data) => {
        console.log(data);
        this.formJob = data;
      },
      (error) => {
        console.error("Erro ao buscar dados da api:", error);
        }
      );
  }
  getEducation(){
    this.formPerfilEducation.getEducation().
      subscribe((educData) => {
        console.log(educData);
        this.formEducation = educData;
      },
      (error) => {
        console.error("Erro ao buscar dados da api:", error);
        }
      );
  }

  

  fileChanged(event: any) {
    const selectedFile = event.target.files[0];
    
    if (selectedFile) {
        this.perfilService.uploadImage(selectedFile).subscribe(()=>{ this.notificationService.success('Perfil salvo com sucesso!');});  
        this.getPerfilData();
    } 
  }


  
  editarPerfilIntroduction() {
    let dialogRef = this.dialog.open(FormPerfilComponent, {
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

  editarPerfilCoverPhoto() {
    let dialogRef = this.dialog.open(CoverPhotoComponent, {
      height: '400px',
      width: '750px',
      data: {
        user: {

        },
      },
    });
  }

}


