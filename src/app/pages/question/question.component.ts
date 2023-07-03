import { DialogComponent } from './../dialog/dialog.component';
import { itca } from '../data/data_itca';
import { Question } from '../data/model';
import { nihonsyu3 } from '../data/data_nihonsyu3';
import { nihonsyu2 } from '../data/data_nihonsyu2';
import { marketing3 } from '../data/data_marketing3';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Kaitoutemp{
  msg: string;
  isExact: boolean;

}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  toppings: UntypedFormGroup;
  selectItem: number[] = [];
  kaitou: string[] = [];
  kaitoutemp: Kaitoutemp[] = [];
  finished: boolean[] = [];
  corrects: number = 0;

  isShuffle: boolean = false;
  //試験データの取得
  questions: Question[] = [];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
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
      case 'nihonsyu2':
        // 日本酒検定
        // this.questions = nihonsyu3;
        this.SetQuestions(nihonsyu2);
        break;
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

      case 'marketing3':
        // マーケティング検定３級
        this.SetQuestions(marketing3);
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

  public myCheck(cidx:number) {
    // for (let i = 0; i < this.questions.length; i++) {
    if (this.selectItem[cidx] !== undefined) {

      //要素数分の配列を作成し、５の倍数の一覧を生成
      let mod5Ar: number[] = [...Array(this.questions.length)]
        .map((_, i) => i)
        .filter(function (n) { return (n % 5 == 0); }); //=> [ 5, 10, 15, 20, 25 ]

        //択一式問題
      if (this.questions[cidx].multi === undefined) {
        if (this.selectItem[cidx] === this.questions[cidx].answer[0]) {
          this.kaitou[cidx] = '正解！';

          //連続正解し、正解数が５の倍数の場合にスナックバーを表示する
          this.CheckSnackBar(cidx, mod5Ar);

        }
        else {
          this.kaitou[cidx] = '不正解。';
          this.corrects = 0;
          // this.finished[cidx] = false;
          }
        this.finished[cidx] = true;
      }
      //複数選択
      else {
        this.kaitou[cidx] = this.kaitoutemp[cidx].msg;
        if (this.kaitoutemp[cidx].isExact === true) {

          //連続正解し、正解数が５の倍数の場合にスナックバーを表示する
          this.CheckSnackBar(cidx, mod5Ar);

        }
        this.finished[cidx] = true;
      }
    }
    // }
  }

  private CheckSnackBar(cidx:number, mod5Ar:number[]) {
    if (this.finished[cidx] == undefined) {
      this.corrects++;        //解答済みの問題を正解しても、連続正解に加算しない。
    }
    if (mod5Ar.indexOf(this.corrects) >= 1) {
      this.openSnackBar(this.corrects.toString(), 1000);
    }
  }

  public checkSelectItem( t: boolean, i :number) {
    this.selectItem[i] = 1;
  }

  /**
   * setKaitou
   */
  public setKaitou(isExact: boolean, i: number) {
    if (isExact === true) {
      this.kaitoutemp[i] = { msg: '正解！', isExact: true };
      // this.finished[i] = true;
    }
    else {
      this.kaitoutemp[i] = { msg: '不正解。', isExact: false };
      // this.finished[i] = false;
    }

  }


  private openSnackBar(msg:string, p_time:number) {
    this._snackBar.open(`${msg} 問連続正解！`, null,{
      duration: p_time,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
