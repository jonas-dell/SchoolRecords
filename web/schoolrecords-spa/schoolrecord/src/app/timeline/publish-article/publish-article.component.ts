import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

@Component({
  selector: 'app-publish-article',
  templateUrl: './publish-article.component.html',
  styleUrls: [
    './publish-article.component.css',
    '../../shared/base-form/base-form.component.css',
  ]
})
export class PublishArticleComponent extends BaseFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PublishArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super(dialogRef);
  }

  ngOnInit(): void {}

  save() {
    alert('Salvar alguma coisa');
  }

  articleSelected: boolean = false;
  selectedFileArticleName: string = '';
  
  fileChangedArticle(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileArticleName = file.name;
      this.articleSelected = true;
    }
  }

  fileChangedPhoto(event: any): void {
    alert("Funcionou")
  }
  
}
