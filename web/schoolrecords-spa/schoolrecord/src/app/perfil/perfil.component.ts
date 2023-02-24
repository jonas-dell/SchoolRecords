import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {

    let fileButtonContainer = document.getElementById('button-file-container');
    let file = document.getElementById('file-img-input');

    fileButtonContainer?.addEventListener('click', () => {
      file?.click();
    });

  }
}
