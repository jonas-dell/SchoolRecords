import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrentUserService } from '../shared/services/current-user.service';
import { NotificationService } from '../shared/services/notification.service';
import { RequestResponse } from './../shared/responses/request-response';
import { LoginService } from './login.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  user = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private currentUserService: CurrentUserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  login(e: any) {
    e.preventDefault();

    if (!this.user.valid) {
      return this.notificationService.errorFields();
    }

    this.loading = true;
    this.loginService.login(this.user.value).subscribe(
      (resp: RequestResponse) => {
        this.loading = false;

        if (!resp.successful) {
          this.toastr.error(resp.message);
          return;
        }

        this.toastr.success(resp.message);
        this.currentUserService.setCurrentUser(resp.data);
        this.user.reset();
        this.router.navigate(['/home']);
      },
      (resp: RequestResponse) => {
        this.loading = false;
        console.log(resp.message);
      }
    );
  }
}
