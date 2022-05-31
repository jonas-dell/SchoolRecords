import { AppComponent } from './app.component';
import { ContactComponent } from './core/contact/contact.component';
import { HeaderComponent } from './core/header/header.component';
import { ProfileComponent } from './core/profile/profile.component';
import { SideBarComponent } from './core/side-bar/side-bar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export class Index {
  static getComponents() {
    return [
      AppComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent,
      SideBarComponent,
      HeaderComponent,
      ProfileComponent,
      ContactComponent,
    ];
  }
}
