import { type Task, type Priority } from '../types';

/**
 * 要件1: タスクのフィルタリング
 * priority が 'すべて' なら全件、それ以外は一致するタスクのみ。
 * hideDone が true なら完了タスクを除外する。
 */
export function filterTasks(
  tasks: Task[], 
  priority: Priority | 'すべて', 
  hideDone: boolean
): Task[] {
  return tasks.filter((task) => {
    if (hideDone && task.done) return false;
    if (priority !== 'すべて' && task.priority !== priority) return false;
    return true;
  });
}

/**
 * 要件2: 期限順のソート（非破壊）
 * 'asc'/'desc' で期限順に並び替えた新しい配列を返す。
 */
export function sortTasksByDueDate(tasks: Task[], order: 'asc' | 'desc'): Task[] {
  return [...tasks].sort((a, b) => {
    const timeA = new Date(a.dueDate).getTime();
    const timeB = new Date(b.dueDate).getTime();
    return order === 'asc' ? timeA - timeB : timeB - timeA;
  });
}

/**
 * 要件3: タスクの集計
 * 指定されたキーを持つオブジェクトを返す。
 * 0件のときは doneRate を 0 にして NaN を回避する。
 */
export function calcSummary(
  tasks: Task[], 
  today: string
): { total: number; done: number; doneRate: number; overdue: number } {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const doneRate = total > 0 ? Math.round((done / total) * 100) : 0;
  const overdue = tasks.filter((t) => !t.done && t.dueDate < today).length;

  return { total, done, doneRate, overdue };
}