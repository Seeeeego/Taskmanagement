import { type Task, type Priority } from '../types';

// フィルタリング
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

// ソート (C-6: 非破壊)
export function sortTasks(tasks: Task[], order: 'asc' | 'desc'): Task[] {
  return [...tasks].sort((a, b) => {
    const timeA = new Date(a.dueDate).getTime();
    const timeB = new Date(b.dueDate).getTime();
    return order === 'asc' ? timeA - timeB : timeB - timeA;
  });
}

// 集計 (戻り値はタプル型 [総数, 完了数, 完了率, 期限切れ数] にして追加の型定義を回避)
export function calculateSummary(tasks: Task[], todayStr: string): [number, number, number, number] {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.done).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const overdue = tasks.filter((t) => !t.done && t.dueDate < todayStr).length;

  return [total, completed, percent, overdue];
}