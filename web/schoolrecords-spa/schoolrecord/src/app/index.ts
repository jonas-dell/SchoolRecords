import { AppComponent } from './app.component';
import { ContactComponent } from './core/contact/contact.component';
import { HeaderComponent } from './core/header/header.component';
import { ProfileComponent } from './core/profile/profile.component';
import { SideBarComponent } from './core/side-bar/side-bar.component';
import { FeedComponent } from './feed/feed.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { InvitationComponent } from './invitation/invitation.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
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
      PersonalDataComponent,
      NotFoundComponent,
      PerfilComponent,
      InvitationComponent,
      RegisterComponent,
      TimelineComponent,
      GamesComponent,
      FeedComponent,
    ];
  }
}
