import { type Task, type Priority } from '../types';

//   要件1: タスクのフィルタリング
//   priority が 'すべて' なら全件、それ以外は一致するタスクのみ。
//   hideDone が true なら完了タスクを除外する
export function filterTasks( tasks: Task[], priority: Priority | 'すべて', hideDone: boolean): Task[] {
  return tasks.filter((task) => {
    // 完了を非表示がONかつタスクが完了済み
    if (hideDone && task.done) return false;
    // 全て以外が選択中かつ選択中の優先度がこのタスクと一致しないないなら自配列から排除
    if (priority !== 'すべて' && task.priority !== priority) return false;
    return true;
  });
}

//  要件2: 期限順のソート
//  'asc'/'desc' で期限順に並び替えた新しい配列を返す
export function sortTasksByDueDate( tasks: Task[], order: 'asc' | 'desc'): Task[] {
  return [...tasks].sort((a, b) => {
    const A = new Date(a.dueDate).getTime();
    const B = new Date(b.dueDate).getTime();
    return order === 'asc' ? A - B : B - A;
  });
}

//  要件3: タスクの集計
//  { total: 総数, done: 完了数, doneRate: 完了率(%), overdue: 期限切れ件数 } を返す。
//  0件のとき doneRate は 0（NaN にしない）。※「今日」を引数 today で受け取るとテストしやすい
export function calcSummary( tasks: Task[], today: string): { total: number; done: number; doneRate: number; overdue: number } {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const doneRate = total > 0 ? Math.round((done / total) * 100) : 0;
  const overdue = tasks.filter((t) => !t.done && t.dueDate < today).length;

  return { total, done, doneRate, overdue };
}