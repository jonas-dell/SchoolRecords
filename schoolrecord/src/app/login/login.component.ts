import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../shared/services/notification.service';
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
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  login(e: any) {
    e.preventDefault();

    if (!this.user.valid) {
      return this.notificationService.errorFields();
    }

    this.loading = true;
    this.loginService.login(this.user.value).subscribe((resp) => {
      if (resp.successful) {
        this.loading = false;
        this.toastr.success(resp.message);
        this.user.reset();
        this.router.navigate(['/home']);
      }
    });
  }
}
