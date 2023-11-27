import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { PublishArticleService } from './publish-article.service';
import { PdfConversionService } from './pdf-conversion.service';

@Component({
  selector: 'app-publish-article',
  templateUrl: './publish-article.component.html',
  styleUrls: [
    './publish-article.component.css',
    '../../shared/base-form/base-form.component.css',
  ]
})
export class PublishArticleComponent extends BaseFormComponent implements OnInit {
  formulario!: FormGroup;
  articleSelected: boolean = false;
  selectedFileArticleName: string;
  fileChangedArticleFile: File | undefined;
  public anos: string[] = [];
  public meses: string[] = [];
  public dias: string[] = [];
  formData: FormData = new FormData();

  constructor(
    private fb: FormBuilder,
    private publishArticleService: PublishArticleService,
    private notificationService: NotificationService,
    private pdfConversionService: PdfConversionService,
    public dialogRef: MatDialogRef<PublishArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super(dialogRef);
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      title: ['', [Validators.required]],
      authors: ['', [Validators.nullValidator]],
      day: ['', [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
      numberPages: ['', [Validators.nullValidator, Validators.pattern('^[0-9]+$')]]
    });
    this.list();
  }

  list() {
    this.popularAnos();
    this.popularMeses();
    this.popularDias();
  }
  save(): void {
    if (this.formulario.valid && this.articleSelected) {
      const formData = this.formulario.value;

      this.formData.append('title', formData.title);
      this.formData.append('authors', formData.authors);
      this.formData.append('day', formData.day);
      this.formData.append('month', formData.month);
      this.formData.append('year', formData.year);
      this.formData.append('numberPages', formData.numberPages);

      if (this.fileChangedArticleFile) {
        this.pdfConversionService.convertToBase64(this.fileChangedArticleFile).subscribe(
          base64Data => {
            this.formData.append('PdfFile', base64Data);

            this.publishArticleService.uploadFormData(this.formData).subscribe(
              response => {
                console.log('Resposta do servidor:', response);
                this.notificationService.success('Artigo enviado com sucesso!');
                this.dialogRef.close();
              },
              error => {
                console.error('Erro ao enviar dados:', error);
                this.notificationService.error('Erro ao enviar o artigo. Por favor, tente novamente.');
              }
            );
          },
          error => {
            console.error('Erro ao converter PDF para Base64:', error);
            this.notificationService.error('Erro ao converter o artigo para Base64.');
          }
        );
      }
    } else if (!this.articleSelected) {
      this.notificationService.error('Por favor, selecione um artigo antes de salvar.');
    } else {
      this.notificationService.error('Por favor, preencha todos os campos obrigatórios');
    }
  }



  fileChangedArticle(event: any): void {
    this.fileChangedArticleFile = event.target.files[0];
    console.log(this.fileChangedArticleFile);

    if (this.fileChangedArticleFile) {
      this.selectedFileArticleName = this.fileChangedArticleFile.name;
      console.log(this.selectedFileArticleName);
      this.articleSelected = true;
    }

  }


  popularAnos() {
    this.anos.push('Year');
    for (
      let anoAtual = new Date().getFullYear();
      anoAtual >= 1750;
      anoAtual--
    ) {
      this.anos.push(anoAtual.toString());
    }
  }

  popularMeses() {
    var meses: string[] = [
      'Month',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    for (var item of meses) {
      this.meses.push(item);
    }
  }

  popularDias() {
    this.dias.push('Days');
    for (let i = 1; i <= 31; i++) {
      let result: string = i.toString();
      this.dias.push(result);
    }
  }
}
