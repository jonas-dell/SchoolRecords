import { Component } from '@angular/core';
import { ConfigService } from './core/config/config.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'schoolrecord';

  constructor(private configService: ConfigService) {}
}
