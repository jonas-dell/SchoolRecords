import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleRelevanceComponent } from './article-relevance/article-relevance.component';
import { EditTextComponent } from './edit-text/edit-text.component';
import { FeedComponent } from './feed/feed.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { InvitesComponent } from './invitation/invitation.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegisterComponent } from './register/register.component';
import { UserGuard } from './shared/services/security/user-guard';
import { TimelineComponent } from './timeline/timeline.component';
import { ImageUpdateService } from './perfil/cover-photo/cover-photo.service';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: '',
        component: FeedComponent,
        pathMatch: 'full',
        canActivate: [UserGuard],
      },
      {
        path: 'timeline',
        component: TimelineComponent,
        pathMatch: 'full',
        canActivate: [UserGuard],
      },
      {
        path: 'games',
        component: GamesComponent,
        pathMatch: 'full',
        children: [],
        canActivate: [UserGuard],
      },
      {
        path: 'edit-text',
        component: EditTextComponent,
        pathMatch: 'full',
        canActivate: [UserGuard],
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        pathMatch: 'full',
        canActivate: [UserGuard],
      },
      {
        path: 'invitation',
        component: InvitesComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'article-relevance',
        component: ArticleRelevanceComponent,
        pathMatch: 'full',
        canActivate: [UserGuard],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        pathMatch: 'full',
        canActivate: [UserGuard],
      },
    ],
  },
  { path: '**', component: NotFoundComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule],
  providers: [UserGuard,ImageUpdateService],
})
export class AppRoutingModule {}
