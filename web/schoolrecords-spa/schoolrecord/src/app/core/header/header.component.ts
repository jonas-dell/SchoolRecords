import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/login/login.component';
import userViews from 'src/app/userViews';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showHeader = false;
 
  toggleHeader(): void{
    alert('Teste do menu hamburger');
    this.showHeader = !this.showHeader;
  }
 
  userViews = userViews ;
  
  constructor() {}
  
  ngOnInit(): void {}
}
