import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotPasswordService } from './forgot-password.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  emailForm!: FormGroup;
  // userForgotPassword = new FormGroup({
  //   forgotPassword: new FormControl('',[Validators.required])
  // })


  
  constructor(
    private router: Router,
    private forgotPasswordService: ForgotPasswordService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    ) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email:['',[Validators.required,Validators.email]]
    });
  }

  onSubmit() {
    if (this.emailForm.valid) {
      const email = this.emailForm.get('email')?.value; 
  
      this.forgotPasswordService.sendRecoveryRequest(email).subscribe(
        (response) => {
          console.log(response);
          console.log(response.data.token);

          if(response.data && response.data.token){
            const recoveryToken = response.data.token
          }
          console.log('Solicitação de recuperação de senha enviada com sucesso:', response);
          this.router.navigate(['/reset-password']);
        },
        (error) => {
          console.error('Erro ao enviar solicitação de recuperação de senha:', error);
        }
      );
    } else {
      if (this.emailForm.get('email')?.hasError('email')) {
        this.notificationService.error('Por favor, insira um endereço de e-mail válido.');
      } else {
        this.notificationService.error('Por favor, insira um endereço de e-mail válido.');
      }
      
      this.validateAllFormFields(this.emailForm);
    }
  }
  private validateAllFormFields(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control);
      }
    })
  }

  
}
