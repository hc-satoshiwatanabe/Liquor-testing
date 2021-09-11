import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../data/model';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnInit {
  @Input() tips?: Question;

  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

}
