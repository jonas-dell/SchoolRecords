import { Component, OnInit } from '@angular/core';
import userViews from 'src/app/userViews';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor() {}
  userViews = userViews ;
  ngOnInit(): void {}
}
