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
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { EditTextComponent } from './edit-text/edit-text.component';

@NgModule({
  declarations: [...Index.getComponents(), ArticleRelevanceComponent, PersonalDataComponent, EditTextComponent],

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
