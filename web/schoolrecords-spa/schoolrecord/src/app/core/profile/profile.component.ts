import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/shared/models/user';
import { ConvertBase64 } from 'src/app/shared/services/perfil-data-utils.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { PerfilDataService } from 'src/app/shared/services/perfil-data.service';


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
    private perfilService: PerfilDataService,
    private convertBase64: ConvertBase64
    ) {}

  ngOnInit(): void {
    this.getPerfilData();
  };

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
}

