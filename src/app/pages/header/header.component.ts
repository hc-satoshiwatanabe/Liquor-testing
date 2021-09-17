import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Question } from '../data/model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() isShow?: EventEmitter<boolean> = new EventEmitter(); // 追加
  faHome = faHome;
  showFiller :boolean= false;

  constructor() { }

  ngOnInit(): void {
  }

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


