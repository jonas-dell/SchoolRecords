import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormPerfilComponent } from './form-perfil/form-perfil.component';
import { PerfilService } from './perfil.service';
import { ConsultaCepService } from './form-perfil/consulta-cep.service';
import { NotificationService } from '../shared/services/notification.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';

export class Perfil {
  profilePic = '';
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
    private perfilService: PerfilService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
    ){ }
     

  ngOnInit(): void {
    this.getPerfilData();
    let fileButtonContainer = document.getElementById('button-file-container');
    let file = document.getElementById('file-img-input');
    fileButtonContainer?.addEventListener('click', () => {
      file?.click();
    });
  }
e
  getPerfilData(){
    const token = localStorage.getItem('token');
    this.perfilService.getPerfil().
    subscribe((dados) => {
      console.log("DADOS RECEBIDOS DA API:", dados);
      this.dados = dados;
      this.dados.foto = this.converterBase64ParaImagem(this.dados.foto);
      console.log(this.dados.foto);
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


  converterBase64ParaBlob(base64: string):Blob{
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/jpeg' }); 
  }

  converterBase64ParaImagem(base64String: string): SafeResourceUrl {
    const imageBlob = this.converterBase64ParaBlob(base64String);
    const imageUrl = URL.createObjectURL(imageBlob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
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


