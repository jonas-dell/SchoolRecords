import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../shared/services/notification.service';
import { ResetPasswordService } from './reset-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  loading: boolean = false;
  type1: string = 'password';
  type2: string = 'password';
  isText1: boolean = false;
  isText2: boolean = false;
  eyeIcon1: string = 'fa-eye-slash';
  eyeIcon2: string = 'fa-eye-slash';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private resetPassword: ResetPasswordService) { }

  ngOnInit(): void {
    this.isText1 = false;
    this.resetPasswordForm = this.formBuilder.group({
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]],
    });
  }

  save() {
    const password1 = this.resetPasswordForm.get('password1')?.value;
    const password2 = this.resetPasswordForm.get('password2')?.value;

    if(password1 === password2){
      console.log('Senhas iguais, pode salvar.');
      this.resetPassword.updatePassword(password1).subscribe(
        (response) =>{
          if(response){
            this.notificationService.success("Password changed successfully!");
            this.router.navigate(['/login']);
          }else{
            this.notificationService.success("Error changing password.");
          }
        }
      )
    }else{
      console.log('Senha diferentes')
      this.notificationService.error('Different password');
      this.resetPasswordForm.get('password2')?.reset();
    }
  }

  hideShowPass1() {
    this.isText1 = !this.isText1;
    this.isText1 ? (this.eyeIcon1 = 'fa-eye') : (this.eyeIcon1 = 'fa-eye-slash');
    this.isText1 ? (this.type1 = 'text') : (this.type1 = 'password');
  }

  hideShowPass2() {
    this.isText2 = !this.isText2;
    this.isText2 ? (this.eyeIcon2 = 'fa-eye') : (this.eyeIcon2 = 'fa-eye-slash');
    this.isText2 ? (this.type2 = 'text') : (this.type2 = 'password');
  }
}
