import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgChartsModule } from 'ng2-charts';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { Index } from '.';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './core/config/config.services';
import { FormPerfilEducationComponent } from './perfil/form-perfil-education/form-perfil-education.component';

export function initWithDependencyFactory(configService: ConfigService) {
  return () => {
    return configService
      .load()
      .toPromise()
      .then((config) => {});
  };
}

@NgModule({
  declarations: [...Index.getComponents(), FormPerfilEducationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgChartsModule,
    NgxLoadingModule.forRoot({}),
    HttpClientModule,
    FormsModule,
    PickerModule,
    CKEditorModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initWithDependencyFactory,
      multi: true,
      deps: [ConfigService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
