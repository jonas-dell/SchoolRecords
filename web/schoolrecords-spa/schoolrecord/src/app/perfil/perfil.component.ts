import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormPerfilComponent } from './form-perfil/form-perfil.component';

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    let fileButtonContainer = document.getElementById('button-file-container');
    let file = document.getElementById('file-img-input');

    fileButtonContainer?.addEventListener('click', () => {
      file?.click();
    });
  }

  editarPerfilIntroduction() {
    let dialogRef = this.dialog.open(FormPerfilComponent, {
      height: '90%',
      width: '50%',
      data: {
        user: {
          id: 1,
          name: 'Jonas',
        },
      },
    });
  }
}
