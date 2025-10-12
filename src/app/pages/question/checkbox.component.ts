import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../data/model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox',
  template: `
    <section class="example-section">
      <span class="example-list-section">
        @for (item of check?.items; track item.val) {
        <mat-checkbox style="display:block;margin: 15px;" [(ngModel)]="item.completed" [value]="item.val"
          (change)="someComplete()">
          {{ item.val + 1 }}.{{ item.name }}
        </mat-checkbox>
        }
        @empty {
        <p>項目がありません。</p>
        }
      </span>
    </section>
  `,
  styles: [`
    .horizontal-list {
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
    }
  `],
  imports: [ReactiveFormsModule, FormsModule, MatCheckboxModule]
})

export class CheckboxComponent {

  @Input() check?: Question;
  @Output() isSelected = new EventEmitter<boolean>();
  @Output() isExact = new EventEmitter<boolean>();


  public someComplete(): boolean | undefined {

    const ar: number[] = [];
    if (this.check?.items == null) {
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


  private arrayEquals(a: any, b: any) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }
}
