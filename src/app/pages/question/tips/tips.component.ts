import { Component,Input } from '@angular/core';
import { Question } from '../../data/model';
import { NgIf, NgFor } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
    selector: 'app-tips',
    templateUrl: './tips.component.html',
    styleUrls: ['./tips.component.scss'],
    standalone: true,
    imports: [MatExpansionModule, NgIf, NgFor]
})
export class TipsComponent {
  @Input() tips?: Question;

  panelOpenState = false;

}
