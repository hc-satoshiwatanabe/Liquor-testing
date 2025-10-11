import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../../data/model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    standalone: true,
    imports: [NgFor, MatCheckboxModule, ReactiveFormsModule, FormsModule]
})

export class CheckboxComponent implements OnInit {

  @Input() check?: Question;
  @Output() isSelected: EventEmitter<boolean> = new EventEmitter(); // 追加
  @Output() isExact: EventEmitter<boolean> = new EventEmitter(); // 追加

  ngOnInit(): void {
  }

  public someComplete():boolean {

    let ar: number[] = [];
    if (this.check.items == null) {
      return false;
    }

    // if (this.check.items.filter(t => t.completed).length > 0) {
    this.isSelected.emit(true);
    // console.log(this.check.items.filter(t => t.val));

    for (let i = 0; i < this.check.items.length; i++){
      if (this.check.items[i].completed === true) {
        ar.push(this.check.items[i].val);

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
