import { itca } from './data/data_itca';
import { Question } from './model';
import { nihonsyu3 } from './data/data_nihonsyu3';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
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
  questions: Question[] =[];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getId();
  }
  /**
   * getId
   */
  private getId(): void{
    //パスパラメータを取得
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'nihonsyu3') {
      this.questions = nihonsyu3;
    }
    switch (id) {
      case 'nihonsyu3':
        this.questions = nihonsyu3;
        break;
      case 'itca':
        this.questions = itca;
        break;
    }

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
