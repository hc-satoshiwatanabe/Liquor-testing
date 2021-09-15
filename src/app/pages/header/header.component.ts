import { Component, OnInit,Input } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Question } from '../data/model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() drawer? :string;
  faHome = faHome;
  showFiller = false;

  constructor() { }

  ngOnInit(): void {
  }

}


