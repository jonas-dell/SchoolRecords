import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { PerfilService } from 'src/app/perfil/perfil.service';
import { PerfilDataService } from '../../shared/services/perfil-data.service';
import { ConvertBase64 } from 'src/app/shared/services/perfil-data-utils.service';
import { FormPerfilJobService } from 'src/app/perfil/form-perfil-job/form-perfil-job.service';
import { ComingSoonComponent } from '../coming-soon/coming-soon.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormPerfilService } from 'src/app/perfil/form-perfil/form-perfil.service';

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
  dadosUser: any;
  formJob: any;

  toggleHeader(): void {
    this.showHeader = !this.showHeader;
  }

  constructor(
    private currentUserService: CurrentUserService,
    private perfilService: PerfilService,
    private convertBase64: ConvertBase64,
    private formPerfilService: FormPerfilService,
    private formPerfilJobService: FormPerfilJobService,
    private PerfilDataService: PerfilDataService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.currentUserService.getCurrentUser();
    this.getPerfilData();
    this.saudacao = this.calcularSaudacao();
    this.getJobExperience();
    this.formPerfilService.perfilData$.subscribe(() => {
      this.getPerfilData();
    })
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

  dropdownNotification() {
    document.getElementById("dropdown")?.classList.remove("show");
    document.getElementById("dropdown-notification")?.classList.toggle("show-notification");
    window.onclick = function (event) {
      if (!event.target.matches('.dropdown-notification-btn, .dropdown-notification-icon')) {
        var dropdownsNotification = document.getElementsByClassName("dropdown-notification-content");
        var i;
        for (i = 0; i < dropdownsNotification.length; i++) {
          var openDropdownNotification = dropdownsNotification[i];
          if (openDropdownNotification.classList.contains('show-notification')) {
            openDropdownNotification.classList.remove('show-notification');
          }
        }
      }
    }
  }

  dropdown() {
    document.getElementById("dropdown-notification")?.classList.remove("show-notification");
    document.getElementById("dropdown")?.classList.toggle("show");
    window.onclick = function (event) {
      if (!event.target.matches('.dropdown-btn, .dropdown-icon, .dropdown-span, .dropdown-svg')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
  }

  exit() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getPerfilData() {
    const token = localStorage.getItem('token');
    this.perfilService.getPerfil().
      subscribe((dados) => {
        this.dados = dados;
        if (this.dados.perfilName === null) {
          this.PerfilDataService.getUser().subscribe((dados) => {
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
          console.error("Erro ao buscar dados da API:", error);
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

  comingSoon() {
    let dialogRef = this.dialog.open(ComingSoonComponent, {
      height: '300px',
      width: '300px',
      data: {
        user: {
          id: 1,
          name: 'Jonas',
        },
      },
    });
  }
}
