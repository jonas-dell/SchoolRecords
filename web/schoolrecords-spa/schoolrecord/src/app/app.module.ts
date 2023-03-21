import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [...Index.getComponents()],
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
