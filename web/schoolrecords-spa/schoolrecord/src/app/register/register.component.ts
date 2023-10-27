import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestResponse } from '../shared/responses/request-response';
import { NotificationService } from '../shared/services/notification.service';
import { RegisterService } from './register.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  user = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private registerService: RegisterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  register(e: any) {
    e.preventDefault();

    if (!this.user.valid) {
      return this.notificationService.errorFields();
    }

    this.loading = true;
    this.registerService.register(this.user.value).subscribe(
      (resp: RequestResponse) => {
        if (resp.successful) {
          this.loading = false;
          this.toastr.success(resp.message);
          this.user.reset();
          this.router.navigate(['/login']);
        }
      },
      (resp: RequestResponse) => {
        this.loading = false;
        this.notificationService.error(resp.message);
      }
    );
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
}
