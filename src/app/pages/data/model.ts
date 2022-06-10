/**
 * 問題の選択肢
 *
 * @export
 * @interface Item
 */
export interface Item {
  val: number;
  name: string;
  completed?: boolean;

}
/**
 *　問題集のモデル
 * {}
 * @export
 * @interface Question
 */
export interface Question {
  chapter: string;
  items: Item[];
  answer: number[];
  multi?: boolean;
  tips?: string;
  link?:string;
}
