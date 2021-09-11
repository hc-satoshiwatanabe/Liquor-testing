import { DialogComponent } from './../dialog/dialog.component';
import { itca } from '../data/data_itca';
import { Question } from '../data/model';
import { nihonsyu3 } from '../data/data_nihonsyu3';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {


  selectItem: number[] = [];
  kaitou: string[] = [];
  finished: boolean[] = [];

  isShuffle: boolean = false;
  //試験データの取得
  questions: Question[] =[];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.isShuffle = true;
    this.getId();
  }


  private shuffle(array:any) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  public openDialog() {

    if (this.HasSelected()=== false) {
      this.getId();
      return;
    }

    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result === true) {
        this.getId();
        this.selectItem = [];
        this.kaitou= [];
        this.finished = [];
      }

    });

  }

  private getId(): void{
    //パスパラメータを取得
    const id = this.route.snapshot.paramMap.get('id');

    switch (id) {
      case 'nihonsyu3':
        // 日本酒検定
        // this.questions = nihonsyu3;
        this.SetQuestions(nihonsyu3);
        break;

      case 'itca':
        // ITコーディネーター
        // this.questions = itca;
        this.SetQuestions(itca);
        break;

    }

  }

  private SetQuestions(p_ar: Question[]) {

    this.questions = [];

    //シャッフル有無
    if (this.isShuffle) {
      let ar: number[] = [...Array(p_ar.length)].map((_, i) => i); //=> [ 0, 1, 2, 3, 4 ]

      ar = this.shuffle(ar);
      for (let i = 0; i < p_ar.length; i++) {
        for (let ii = 0; ii < ar.length; ii++) {
          this.questions[i] = p_ar[ar[i]];
        }
      }
    }
    else {
      this.questions = p_ar;

    }
  }


private HasSelected() :Boolean {
  for (let i = 0; i < this.questions.length; i++) {
    if (this.selectItem[i] !== undefined) {
      return true;
    }
  }
  return false;
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
