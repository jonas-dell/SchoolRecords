import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from '../core/config/config.services';
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
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"; 
 
  user = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  loginSuccess = (resp: RequestResponse) => {
    this.loading = false;

    if (!resp.successful) {
      this.toastr.error(resp.message);
      return;
    }

    this.toastr.success(resp.message);
    console.log(resp.data);
    this.currentUserService.setCurrentUser(resp.data);
    this.user.reset();
    this.router.navigate(['/home']);
  };
  loginError = (resp: RequestResponse) => {
    this.loading = false;
    console.log(resp.message);
  };

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private configService: ConfigService,
    private currentUserService: CurrentUserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.configService.getConfig().windowsAuthentication) {
      this.loginService
        .loginWindowsAuthentication()
        .subscribe(this.loginSuccess, this.loginError);
    }
  }

  login(e: any) {
    if (!this.user.valid) {
      return this.notificationService.errorFields();
    }

    this.loading = true;
    
    const user = {
      userName: this.user.value.userName,
      password: this.user.value.password,
    };

    this.loginService.login(user).subscribe(
      (response: any) => {
        if (response && response.data.token) {
          // Salve o token JWT no localStorage 
          localStorage.setItem('token', response.data.token);
          
          // Redirecione o usuário para a página de destino após o login bem-sucedido
          this.router.navigate(['/home']);
        } else {
          this.toastr.error('Falha ao fazer login. Por favor, verifique suas credenciais.');
        }
        this.loading = false;
      },
      (error) => {
        this.toastr.error('Falha ao fazer login. Por favor, verifique suas credenciais.');
        this.loading = false;
      }
    );
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
}
