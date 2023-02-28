import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleRelevanceComponent } from './article-relevance/article-relevance.component';
import { FeedComponent } from './feed/feed.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { InvitesComponent } from './invitation/invitation.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegisterComponent } from './register/register.component';
import { TimelineComponent } from './timeline/timeline.component';
import { EditTextComponent } from './edit-text/edit-text.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: FeedComponent, pathMatch: 'full' },
      {
        path: 'timeline',
        component: TimelineComponent,
        pathMatch: 'full',
      },
      { path: 'games', component: GamesComponent, pathMatch: 'full' },
      { path: 'edit-text', component: EditTextComponent, pathMatch: 'full' },
      { path: 'perfil', component: PerfilComponent, pathMatch: 'full' },
      { path: 'invitation', component: InvitesComponent },
      {
        path: 'article-relevance',
        component: ArticleRelevanceComponent,
        pathMatch: 'full',
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
