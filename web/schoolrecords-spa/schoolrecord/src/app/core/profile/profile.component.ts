import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PerfilService } from 'src/app/perfil/perfil.service';
import { User } from 'src/app/shared/models/user';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { NotificationService } from 'src/app/shared/services/notification.service';


@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  dados: any;
  user: User | null;

  constructor(
    private currentUserService: CurrentUserService,
    private notificationService: NotificationService,
    private perfilService: PerfilService,
    private sanitizer: DomSanitizer
    ) {}

  ngOnInit(): void {
    this.getPerfilData();
    this.user = this.currentUserService.getCurrentUser();
  };


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

}

