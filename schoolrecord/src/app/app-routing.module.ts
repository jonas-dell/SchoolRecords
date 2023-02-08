import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
// import { NotFoundComponent } from './not-found/not-found.component';
// import { PerfilComponent } from './perfil/perfil.component';
import { RegisterComponent } from './register/register.component';
import { InvitationComponent } from './invitation/invitation.component';
import { TimelineComponent } from './timeline/timeline.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NotFoundComponent } from './not-found/not-found.component';
// import { TimelineComponent } from './timeline/timeline.component';

// const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'invitation', component: InvitationComponent },
// ];


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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
  { path: 'invitation', component: InvitationComponent },
];















@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
