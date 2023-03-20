import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private currentUserService: CurrentUserService) {}

  ngOnInit(): void {
    this.user = this.currentUserService.getCurrentUser();
  }
}
