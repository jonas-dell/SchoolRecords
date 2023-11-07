import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NotificationService } from '../shared/services/notification.service';
import { PostService } from './publish-post.service';

@Component({
  selector: 'app-publish-post',
  templateUrl: './publish-post.component.html',
  styleUrls: ['./publish-post.component.css']
})


export class PublishPostComponent implements OnInit {
    
  dados: any;
  formulario: FormGroup;

  constructor(
    private postService: PostService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
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
      });
    }

  ngOnInit(): void {

  }

  closeDialog() {
    this.dialogRef.close();
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
