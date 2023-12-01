import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/services/notification.service';
import { TokenService } from './token.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  @ViewChild('tokenInput') tokenInput!: ElementRef; // Adicione esta linha

  tokenForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.tokenForm = this.fb.group({
      token: ['', Validators.required]
    });
  }

  onSubmit() {
    const token = this.tokenForm.get('token')?.value;
    console.log(token);

    if (this.tokenForm.valid) {
      this.tokenService.getRecoveryToken(token).subscribe(
        (response: number) => {
          console.log(response);
          if (response === 200) {
            this.router.navigate(['/forgot-password/token/resetPassword']);
          } else if (response === 400) {
            this.notificationService.error('Expired token');
            this.tokenForm.reset();
          } else if (response === 404) {
            this.notificationService.error('Invalid token');
            this.tokenForm.reset();
          } else {
            this.notificationService.error(`Error sending the token. Value: ${response}`);
          }
        },
        (error) => {
          if (error === 404) {
            this.notificationService.error('Token not found');
          } else {
            this.notificationService.error('Error sending token');
          }
        }
      );
    } else {
      this.notificationService.error('*Token is required');
    }
  }


}
