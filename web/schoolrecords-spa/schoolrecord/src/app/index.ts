import { AppComponent } from './app.component';
import { ArticleRelevanceComponent } from './article-relevance/article-relevance.component';
import { ContactComponent } from './core/contact/contact.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { ProfileComponent } from './core/profile/profile.component';
import { SideBarComponent } from './core/side-bar/side-bar.component';
import { EditTextComponent } from './edit-text/edit-text.component';
import { FeedComponent } from './feed/feed.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { InvitesComponent } from './invitation/invitation.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { RegisterComponent } from './register/register.component';
import { BotaoComponent } from './shared/botao/botao.component';
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
      InvitesComponent,
      RegisterComponent,
      TimelineComponent,
      GamesComponent,
      FeedComponent,
      ArticleRelevanceComponent,
      PersonalDataComponent,
      EditTextComponent,
      FooterComponent,
      BotaoComponent,
      ForgotPasswordComponent,
    ];
  }
}
