import { DialogComponent } from './../dialog/dialog.component';
import { itca } from '../data/data_itca';
import { Question } from '../data/model';
import { nihonsyu3 } from '../data/data_nihonsyu3';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  toppings: FormGroup;
  selectItem: number[] = [];
  kaitou: string[] = [];
  kaitoutemp: string[] = [];
  finished: boolean[] = [];

  isShuffle: boolean = false;
  //試験データの取得
  questions: Question[] = [];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {  }

  ngOnInit(): void {
    // this.isShuffle = true;
    this.getId();
  }

  public openDialog() {

    if (this.HasSelected() === false) {
      this.getId();
      return;
    }

    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result === true) {
        this.getId();
        this.selectItem = [];
        this.kaitou = [];
        this.finished = [];

        //チェックボックスを初期化
        for (let i = 0; this.questions.length; i++){
          if (this.questions[i].multi === true) {
            for (let ii = 0; this.questions[i].items.length; ii++){
              this.questions[i].items[ii].completed = false;
            }
          }
        }
      }

    });

  }

  private getId(): void {
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

  private SetQuestions(p_Ar: Question[]) {

    this.questions = [];

    let wi: number = 0;

    //シャッフル有無
    if (this.isShuffle) {

      //要素数分の配列を作成
      let randomAr: number[] = [...Array(p_Ar.length)].map((_, i) => i); //=> [ 0, 1, 2, 3, 4 ]

      //要素番号をシャッフル
      randomAr = this.shuffle(randomAr);

      //問題文に代入
      for (let i = 0; i < p_Ar.length; i++) {
        if (p_Ar[randomAr[i]].chapter !== '') {
          this.questions[wi] = p_Ar[randomAr[i]];
          wi++;
        }
      }
    }
    else {
      //事前登録のデータ順
      this.questions = p_Ar;

    }
  }
  private shuffle(array: any) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private HasSelected(): Boolean {
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

        //択一式問題
        if (this.questions[i].multi === undefined) {
          if (this.selectItem[i] === this.questions[i].answer[0]) {
            console.log('exact!!');
            this.kaitou[i] = '正解！';
          }
          else {
            this.kaitou[i] = '不正解。';
          }
        }
        else {
          this.kaitou[i] = this.kaitoutemp[i];
        }
      }
    }
  }

  public checkSelectItem( t: boolean, i :number) {
    this.selectItem[i] = 1;
    console.log(`selected[${i}]`);
  }

  /**
   * setKaitou
   */
  public setKaitou(msg: string, i: number) {
    this.kaitoutemp[i] = msg;
  }

}
