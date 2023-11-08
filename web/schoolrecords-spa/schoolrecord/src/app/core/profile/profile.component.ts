import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/shared/models/user';
import { ConvertBase64 } from 'src/app/shared/services/perfil-data-utils.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { PerfilDataService } from 'src/app/shared/services/perfil-data.service';
import { FormPerfilJobService } from 'src/app/perfil/form-perfil-job/form-perfil-job.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  dados: any;
  dadosUser: any;
  user: User | null;
  formJob: any;

  constructor(
    private currentUserService: CurrentUserService,
    private notificationService: NotificationService,
    private perfilService: PerfilDataService,
    private convertBase64: ConvertBase64,
    private formPerfilJobService: FormPerfilJobService
  ) {}

  ngOnInit(): void {
    this.getPerfilData();
    this.getJobExperience();
  }

  getPerfilData() {
    const token = localStorage.getItem('token');
    this.perfilService.getPerfil().subscribe(
      (dados) => {
        this.dados = dados;
        if (this.dados.perfilName === null) {
          this.perfilService.getUser().subscribe((dados) => {
            this.dadosUser = dados;
            function primeiraLetraMaiuscula(string) {
              return string.charAt(0).toUpperCase() + string.slice(1);
            }
            const capitalizeString = primeiraLetraMaiuscula(
              this.dadosUser.username
            );
            this.dados.perfilName = capitalizeString;
          });
        }
        this.dados.foto = this.convertBase64.converterBase64ParaImagem(
          this.dados.foto
        );
      },
      (error) => {
        console.error('Erro ao buscar dados da API:', error);
      }
    );
  }

  getJobExperience() {
    this.formPerfilJobService.getJobExperience().subscribe(
      (data) => {
        this.formJob = data || '';
      },
      (error) => {
        console.error('Erro ao buscar os dados da api:', error);
      }
    );
  }
}
