import { Component } from '@angular/core';
import { HeaderComponent } from './pages/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    MatSidenavModule,
    MatIconModule,
    RouterModule,
  ]
})
export class AppComponent {
  title = 'Liquor-testing';
  showFiller = false;
}
