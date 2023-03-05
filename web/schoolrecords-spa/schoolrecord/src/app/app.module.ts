import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgChartsModule } from 'ng2-charts';
import { NgxLoadingModule } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { Index } from '.';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleRelevanceComponent } from './article-relevance/article-relevance.component';
import { FooterComponent } from './core/footer/footer.component';
import { EditTextComponent } from './edit-text/edit-text.component';
import { LoginComponent } from './login/login.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { BotaoComponent } from './shared/botao/botao.component';
import { FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [
    ...Index.getComponents(),
    ArticleRelevanceComponent,
    PersonalDataComponent,
    EditTextComponent,
    FooterComponent,
    BotaoComponent,

  ],
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
