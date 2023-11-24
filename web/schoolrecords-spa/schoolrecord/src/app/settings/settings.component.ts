import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { User } from 'src/app/shared/models/user';
import { PerfilDataService } from '../shared/services/perfil-data.service';
import { ComingSoonComponent } from '../core/coming-soon/coming-soon.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  dados: any;
  dadosUser: any;
  user: User | null;

  constructor(
    private perfilDataService: PerfilDataService,
    private settingsService: SettingsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPerfilData();
  }

  showDiv: boolean = true;

  hideDiv() {
    this.showDiv = !this.showDiv;
  }

  getPerfilData() {
    const token = localStorage.getItem('token');
    this.perfilDataService.getPerfil().subscribe(
      (dados) => {
        this.dados = dados;
        if (this.dados.perfilName === null) {
          this.perfilDataService.getUser().subscribe((dados) => {
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
      },
      (error) => {
        console.error('Erro ao buscar dados da API:', error);
      }
    );
  }

  closeAccount() {
    alert("Funcionou!")
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
