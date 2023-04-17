import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { CurrentUserService } from '../../shared/services/current-user.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: User | null;
  showHeader: boolean = false;

  toggleHeader(): void {
    this.showHeader = !this.showHeader;
  }

  constructor(private currentUserService: CurrentUserService) {}

  ngOnInit(): void {
    this.user = this.currentUserService.getCurrentUser();
  }
}
