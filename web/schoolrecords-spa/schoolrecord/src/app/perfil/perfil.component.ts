import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../shared/services/notification.service';
import { ConvertBase64 } from '../shared/services/perfil-data-utils.service';
import { PerfilDataService } from '../shared/services/perfil-data.service';
import { CoverPhotoComponent } from './cover-photo/cover-photo.component';
import { FormPerfilEducation } from './form-perfil-education/form-perfil-education.service';
import { FormPerfilJobService } from './form-perfil-job/form-perfil-job.service';
import { FormPerfilComponent } from './form-perfil/form-perfil.component';
import { FormPerfilContactComponent } from './form-perfil-contact/form-perfil-contact.component';
import { ComingSoonComponent } from '../core/coming-soon/coming-soon.component';
import { PerfilService } from './perfil.service';
import { SharedService } from './cover-photo/shared.service';
import { User } from 'src/app/shared/models/user';

export class Perfil {}

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  dados: any;
  dadosUser: any;
  formJob: any;
  formEducation: any;
  perfil = new Perfil();
  file: File | null = null;
  numeroDeContatosResult: number | undefined;
  imagemSrc: string = '';
  user: User | null;

  constructor(
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private perfilDataService: PerfilDataService,
    private perfilService: PerfilService,
    private formPerfilJobService: FormPerfilJobService,
    private formPerfilEducation: FormPerfilEducation,
    private convertBase64: ConvertBase64,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getPerfilData();
    this.getJobExperience();
    this.getEducation();
    this.numeroDeContatos();
    this.sharedService.getImageUpdatedObservable().subscribe(() => {
      this.getPerfilData();
    });

    let fileButtonContainer = document.getElementById('button-file-container');
    let file = document.getElementById('file-img-input');
    fileButtonContainer?.addEventListener('click', () => {
      file?.click();
    });
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
        this.dados.foto = this.convertBase64.converterBase64ParaImagem(
          this.dados.foto
        );
        this.dados.imagem = this.convertBase64.converterBase64ParaImagem(
          this.dados.imagem
        );
      },
      (error) => {
        console.error('Erro ao buscar os dados da API:', error);
      }
    );
  }

  getJobExperience() {
    this.formPerfilJobService.getJobExperience().subscribe(
      (data) => {
        console.log(data);
        this.formJob = data;
      },
      (error) => {
        console.error('Erro ao buscar os dados da api:', error);
      }
    );
  }

  imagemFaculdade: Record<string, string> = {
    fatec: 'fatec.jpg',
    fam: 'fam.png',
    usp: 'usp.png',
    ftt: 'ftt.jpg',
    fundacao: 'fundacao.jpg',
    abc: 'abc.png',
    default: 'default.jpg.png',
    federaldesaopaulo: 'federalDeSaoPaulo.png',
    federalminasgerais: 'federalminasgerais.png',
    fgv: 'fgv.png',
    mackenzie: 'mackenzie.png',
    puc: 'puc.png',
    unicamp: 'unicamp.png',
    unifesp: 'unifesp.jpg',
  };

  getEducation() {
    this.formPerfilEducation.getEducation().subscribe(
      (educData) => {
        this.formEducation = educData;
        if (this.formEducation !== null) {
          let tituloFaculdade = this.formEducation?.title;
          tituloFaculdade = tituloFaculdade;

          console.log(tituloFaculdade);
          if (tituloFaculdade) {
            const nomeDoArquivo = this.imagemFaculdade[tituloFaculdade];
            console.log(nomeDoArquivo);
            this.imagemSrc = `./../../assets/img/${nomeDoArquivo}`;
          } else {
            this.imagemSrc = `./../../assets/img/default.png`;
          }
        }
      },
      (error) => {
        console.error('Erro ao buscar os dados da api:', error);
      }
    );
  }

  fileChanged(event: any) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      this.perfilDataService.uploadImage(selectedFile).subscribe(() => {
        this.notificationService.success('Perfil salvo com sucesso!');
      });
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

  editPublicUrl() {
    let dialogRef = this.dialog.open(FormPerfilContactComponent, {
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
        user: {},
      },
    });
  }

  numeroDeContatos() {
    this.perfilService.getContactsConnections().subscribe((dados) => {
      this.numeroDeContatosResult = dados?.length;
    });
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
