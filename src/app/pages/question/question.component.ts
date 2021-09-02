import { Question } from './model';
import { Questions } from './data';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {


  selectItem: number[] = [];
  kaitou: string[] = [];
  finished: boolean[] = [];


  //試験データの取得
  questions: Question[] = Questions;

  constructor() { }

  ngOnInit(): void {
  }


public myCheck() {
    for (let i = 0; i < this.questions.length; i++) {
      if (this.selectItem[i] !== undefined) {
        this.finished[i] = true;
        if (this.selectItem[i] === this.questions[i].answer) {
          console.log('exact!!');
          this.kaitou[i] = '正解！'

        }
        else {
          this.kaitou[i] = '不正解。'

        }
      }
    }

  }
}
