import { AppComponent } from './app.component';
import { ContactComponent } from './core/contact/contact.component';
import { HeaderComponent } from './core/header/header.component';
import { ProfileComponent } from './core/profile/profile.component';
import { SideBarComponent } from './core/side-bar/side-bar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PerfilComponent } from './perfil/perfil.component';
import {InvitationComponent} from './invitation/invitation.component';
import { RegisterComponent } from './register/register.component';
import { TimelineComponent } from './timeline/timeline.component';

export class Index {
  static getComponents() {
    return [
      AppComponent,
      ContactComponent,
      HeaderComponent,
      ProfileComponent,
      SideBarComponent,
      HomeComponent,
      LoginComponent,
      NotFoundComponent,
      PerfilComponent,
      InvitationComponent,
      RegisterComponent,
      TimelineComponent,
    ];
  }
}
