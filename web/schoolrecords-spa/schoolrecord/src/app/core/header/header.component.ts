import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { PerfilService } from 'src/app/perfil/perfil.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: User | null;
  showHeader: boolean = false;
  saudacao: string;
  dados: any;

  toggleHeader(): void {
    this.showHeader = !this.showHeader;
  }

  constructor(
    private currentUserService: CurrentUserService,
    private perfilService: PerfilService,
    ) {}

  ngOnInit(): void {
    this.user = this.currentUserService.getCurrentUser();
    this.getPerfilData();
    this.saudacao = this.calcularSaudacao();
  }
  calcularSaudacao(): string {
    const agora = new Date();
    const hora = agora.getHours();

    if (hora >= 6 && hora < 12) {
      return "Good morning";
    } else if (hora >= 12 && hora < 18) {
      return "Good afternoon";
    } else {
      return "Good night";
    }
  }
  getPerfilData(){

    const token = localStorage.getItem('token');
    this.perfilService.getPerfil().
    subscribe((dados) => {
      this.dados = dados;
    },
     (error) => {
      console.error("Erro ao buscar dados da API:", error);
      }
    );
  }
}
