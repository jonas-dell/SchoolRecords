import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NotificationService } from '../shared/services/notification.service';
import { PostService } from './publish-post.service';
import { PerfilDataService } from 'src/app/shared/services/perfil-data.service';
import { ConvertBase64 } from 'src/app/shared/services/perfil-data-utils.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-publish-post',
  templateUrl: './publish-post.component.html',
  styleUrls: ['./publish-post.component.css']
})


export class PublishPostComponent implements OnInit {
    
  dados: any;
  formulario: FormGroup;
  dadosUser: any;
  user: User | null;  

  constructor(
    private postService: PostService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private perfilService: PerfilDataService,
    private convertBase64: ConvertBase64,
    public dialogRef: MatDialogRef<PublishPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data) 
   {
      this.formulario = this.formBuilder.group({
        Id: new FormControl(0, [Validators.nullValidator]),
        Name: new FormControl('', [Validators.nullValidator]),
        Image: new FormControl('', [Validators.nullValidator]),
        Post: new FormControl('', [Validators.nullValidator]),
        Date: new FormControl('', [Validators.nullValidator]),
        PerfilId: new FormControl(0, [Validators.nullValidator]),
        Foto: new FormControl('', [Validators.nullValidator]),
        JobTitle: new FormControl('', [Validators.nullValidator]),
      });
    }

  ngOnInit(): void {
    this.getPerfilData();
  }

  closeDialog() {
    this.dialogRef.close();
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

  fileChangedMedia(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.formulario?.get('Image')?.setValue(e.target?.result);
      this.formulario.patchValue({
        Image: e.target?.result,
      });
    };
    reader.readAsDataURL(file);
  }

  save() {
    this.postService.postInsert(this.formulario.value).subscribe(()=>{
      this.notificationService.success("Post publicado com sucesso!");
      this.closeDialog();
    })
  }
}
