import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../shared/services/notification.service';
import { PostService } from './publish-post.service';

@Component({
  selector: 'app-publish-post',
  templateUrl: './publish-post.component.html',
  styleUrls: ['./publish-post.component.css']
})


export class PublishPostComponent implements OnInit {
  formulario = new FormGroup({
    Id: new FormControl(0, [Validators.nullValidator]),
    Name: new FormControl('', [Validators.nullValidator]),
    Image: new FormControl('', [Validators.nullValidator]),
    Post: new FormControl('', [Validators.nullValidator]),
    Date: new FormControl('', [Validators.nullValidator]),
    PerfilId: new FormControl(0, [Validators.nullValidator]),
    

  });

  
  constructor(
    private postService: PostService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<PublishPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data) 
   { }

  ngOnInit(): void {

  }

  closeDialog() {
    this.dialogRef.close();
  }

  fileChangedMedia(event: any) {
    alert("Funcionou")
  }

  save() {
    this.postService.postInsert(this.formulario.value).subscribe(()=>{
      this.notificationService.success("Salvar alguma coisa!");
      this.closeDialog();
    })
  }
}
