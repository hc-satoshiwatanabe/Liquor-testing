import { Component,Input } from '@angular/core';
import { Question } from '../../data/model';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
    selector: 'app-tips',
    templateUrl: './tips.component.html',
    styleUrls: ['./tips.component.scss'],
    imports: [MatExpansionModule]
})
export class TipsComponent {
  @Input() tips?: Question;

  panelOpenState = false;

}
