import { Component, Output, EventEmitter } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-header',
  template: `
      <hr class="raibowline">
      <mat-toolbar>
        <button matMiniFab aria-label="Example icon button with a menu icon"
          (click)="showDrawer()"
        >
          <mat-icon>menu</mat-icon>
        </button>
        <span>試験対策アプリ</span>
        <span class="example-spacer"></span>
        <a
          href="https://github.com/hcsatoshiwatanabe/Liquor-testing">
          <img src="/assets/icons/GitHub-Mark-32px.png" alt="GitHub Repository">
        </a>
      </mat-toolbar>
    `,
  styles: [`
    .raibowline{
      width:                   100%;
      height:                  2px;
      margin: auto;
      background-repeat:repeat-x;
      background: linear-gradient(to right,
      #eb5252,
      #f78f2f,
      #f4c151,
      #75d850,
      #eb5252
      );
    }
    .example-spacer {
      flex: 1 1 auto;
    }
  `],
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
