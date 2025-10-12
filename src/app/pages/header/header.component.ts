import { Component,Output, EventEmitter } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatIconModule]
})
export class HeaderComponent {

  @Output() isShow = new EventEmitter<boolean>(); // ✅ Corrected line
  faHome = faHome;
  showFiller = false;

  /**
   * showDrawer
   */
  public showDrawer() {
    if (this.showFiller == true) {
      this.showFiller = false;
      this.isShow.emit(false);
    }
    else {
      this.showFiller = true;
      this.isShow.emit(true);
    }
  }

}
