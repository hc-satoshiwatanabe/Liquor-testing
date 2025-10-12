import { Component, EventEmitter, Input,  Output } from '@angular/core';
import { Question } from '../../data/model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    imports: [NgFor, ReactiveFormsModule, FormsModule, MatCheckboxModule]
})

export class CheckboxComponent {

  @Input() check?: Question;
  @Output() isSelected = new EventEmitter<boolean>();
  @Output() isExact = new EventEmitter<boolean>();


  public someComplete():boolean {

    const ar: number[] = [];
    if (this.check.items == null) {
      return false;
    }

    // if (this.check.items.filter(t => t.completed).length > 0) {
    this.isSelected.emit(true);
    // console.log(this.check.items.filter(t => t.val));

    for (const item of this.check.items) {
      if (item.completed === true) {
        ar.push(item.val);
      }
    }

    console.log(this.arrayEquals(this.check.answer, ar));
    if (this.arrayEquals(this.check.answer, ar)) {
      this.isExact.emit(true);
      // console.log('正解！');
    }
    else {
      this.isExact.emit(false);
      // console.log('不正解。');
    }

  }


  private arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }
}
