import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormPerfilComponent } from './form-perfil/form-perfil.component';

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./styles.css'],
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

  editarUsuario() {
    let dialogRef = this.dialog.open(FormPerfilComponent, {
      height: '400px',
      width: '600px',
      data: {
        user: {
          id: 1,
          name: 'Jonas',
        },
      },
    });
  }
}
