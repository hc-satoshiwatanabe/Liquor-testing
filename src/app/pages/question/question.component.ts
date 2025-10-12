import { Component, OnInit, inject } from '@angular/core'; // inject をインポート
import { ActivatedRoute } from '@angular/router';
import { MatDialog,MatDialogModule} from '@angular/material/dialog';
import { MatSnackBar,MatSnackBarModule} from '@angular/material/snack-bar';

import { ReactiveFormsModule, FormsModule} from '@angular/forms';

// --- Component Imports ---
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DialogComponent } from '../dialog/dialog.component'; // DialogComponentをインポート

// --- Data and Models ---
import { Question } from '../data/model';
import { itca } from '../data/data_itca';
import { nihonsyu2 } from '../data/data_nihonsyu2';
import { nihonsyu3 } from '../data/data_nihonsyu3';
import { marketing3 } from '../data/data_marketing3';

// Interface for answer status
export interface Kaitoutemp {
  msg: string;
  isExact: boolean;
}

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
    standalone: true,
    imports: [
        // Common Angular Modules
        NgFor,
        NgIf,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatSnackBarModule,
        MatButtonModule,
        MatRadioModule,
        MatSlideToggleModule,
        // Custom Components
    ]
})
export class QuestionComponent implements OnInit {
  // --- Properties for Component State ---
  selectItem: number[] = [];
  kaitou: string[] = [];
  kaitoutemp: Kaitoutemp[] = [];
  finished: boolean[] = [];
  corrects = 0;
  isShuffle = false;
  questions: Question[] = [];

  // --- Dependency Injection using inject() ---
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getId();
  }

  public openDialog(): void {
    if (!this.hasSelected()) {
      this.getId(); // Reset questions if none are answered
      return;
    }

    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result === true) {
        // Reset all states
        this.getId();
        this.selectItem = [];
        this.kaitou = [];
        this.finished = [];
        this.corrects = 0;

        // Reset checkboxes state
        // 修正点: 無限ループになる可能性があったfor文の条件式を修正
        for (const question of this.questions) {
          if (question.multi === true) {
            for (const item of question.items) {
              item.completed = false;
            }
          }
        }
      }
    });
  }

  private getId(): void {
    const id = this.route.snapshot.paramMap.get('id');
    switch (id) {
      case 'nihonsyu2':
        this.setQuestions(nihonsyu2);
        break;
      case 'nihonsyu3':
        this.setQuestions(nihonsyu3);
        break;
      case 'itca':
        this.setQuestions(itca);
        break;
      case 'marketing3':
        this.setQuestions(marketing3);
        break;
      default:
        // Handle unknown id if necessary
        this.questions = [];
        break;
    }
  }

  private setQuestions(questionArray: Question[]): void {
    if (this.isShuffle) {
      // Create a shuffled copy of the array
      this.questions = [...questionArray].sort(() => Math.random() - 0.5);
    } else {
      this.questions = [...questionArray]; // Use a copy to avoid mutation
    }
  }

  private hasSelected(): boolean {
    // Checks if at least one question has been answered
    return this.selectItem.some(item => item !== undefined);
  }

  public myCheck(cidx: number): void {
    if (this.selectItem[cidx] === undefined) {
      return;
    }

    const isMultiSelect = this.questions[cidx].multi === true;
    let isCorrect = false;

    if (isMultiSelect) {
      // Logic for multi-select questions (checkbox)
      isCorrect = this.kaitoutemp[cidx]?.isExact === true;
      this.kaitou[cidx] = this.kaitoutemp[cidx]?.msg || '不正解。';
    } else {
      // Logic for single-select questions (radio)
      isCorrect = this.selectItem[cidx] === this.questions[cidx].answer[0];
      this.kaitou[cidx] = isCorrect ? '正解！' : '不正解。';
    }

    if (isCorrect) {
      this.checkConsecutiveAnswers(cidx);
    } else {
      this.corrects = 0; // Reset consecutive correct count on wrong answer
    }

    this.finished[cidx] = true;
  }

  private checkConsecutiveAnswers(cidx: number): void {
    if (this.finished[cidx] === undefined) {
      this.corrects++;
    }
    // Display snackbar for every 5 consecutive correct answers
    if (this.corrects > 0 && this.corrects % 5 === 0) {
      this.openSnackBar(`${this.corrects}問連続正解！`, 1500);
    }
  }

  public checkSelectItem(isSelected: boolean, index: number): void {
    // This method is called from the checkbox component's output event
    // It marks the question as "touched" or "answered" so myCheck can run
    if (isSelected) {
      this.selectItem[index] = 1; // Use a simple flag
    }
  }

  public setKaitou(isExact: boolean, index: number): void {
    // This method is called from the checkbox component to set the answer state
    this.kaitoutemp[index] = {
      msg: isExact ? '正解！' : '不正解。',
      isExact: isExact
    };
  }

  private openSnackBar(msg: string, duration: number): void {
    this._snackBar.open(msg, '閉じる', {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
