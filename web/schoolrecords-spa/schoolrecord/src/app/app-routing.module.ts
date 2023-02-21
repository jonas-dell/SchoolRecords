import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GamesComponent } from './games/games.component';
import { ArticleRelevanceComponent } from './article-relevance/article-relevance.component';
import { RegisterComponent } from './register/register.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { InvitationComponent } from './invitation/invitation.component';
import { TimelineComponent } from './timeline/timeline.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditTextComponent } from './edit-text/edit-text.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'invitation', component: InvitationComponent },
  { path: 'games', component: GamesComponent },
  { path: 'article-relevance', component: ArticleRelevanceComponent },

  { path: 'personalData',component: PersonalDataComponent},
  { path: 'editText', component: EditTextComponent},
  
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: TimelineComponent, pathMatch: 'full' },
      {
        path: 'timeline',
        component: TimelineComponent,
        pathMatch: 'full',
      },
      { path: 'perfil', component: PerfilComponent, pathMatch: 'full' },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
