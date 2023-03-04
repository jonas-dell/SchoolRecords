import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../shared/services/notification.service';
import { LoginService } from './login.service';

import { string } from '@amcharts/amcharts4/core';
import userViews from '../userViews';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  userViews = userViews;
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

    console.log(this.user);

    if (!this.user.valid) {
      return this.notificationService.errorFields();
    }

    this.loading = true;
    this.loginService.login(this.user.value).subscribe(
      (resp: any) => {
        if (resp.successful) {
          this.loading = false;
       
        
          this.userViews.push({userName:this.user.value.userName})
          this.toastr.success(resp.message);
          this.user.reset();
          this.router.navigate(['/home']);
        }
      },
      (resp) => {
        this.loading = false;
        console.log(resp.error.message);
        alert('Deu ruim no login');
      }
    );
  }
}
