import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormPerfilComponent } from './form-perfil/form-perfil.component';
import { NotificationService } from '../shared/services/notification.service';
import { ConvertBase64 } from '../shared/services/perfil-data-utils.service';
import { PerfilDataService } from '../shared/services/perfil-data.service';

export class Perfil {
 
}

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  dados: any;
  perfil = new Perfil(); 
  file: File | null = null;

  constructor(
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private perfilService: PerfilDataService,
    private convertBase64: ConvertBase64,
    ){ }
     

  ngOnInit(): void {
    this.getPerfilData();
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
}


