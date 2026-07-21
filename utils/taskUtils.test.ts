import { describe, it, expect } from 'vitest';
import { filterTasks, sortTasksByDueDate, calcSummary } from './taskUtils';
import type { Task } from '../types';

// テスト用の固定モックデータ
const mockTasks: Task[] = [
  { id: '1', title: 'A', assignee: '青木', priority: '高', dueDate: '2026-07-10', done: true },
  { id: '2', title: 'B', assignee: '竹内', priority: '中', dueDate: '2026-07-20', done: false },
  { id: '3', title: 'C', assignee: '高橋', priority: '低', dueDate: '2026-07-15', done: false },
];

// 
describe('filterTasks', () => {
  it('priorityが「すべて」なら全件返る（正常系）', () => {
    const result = filterTasks(mockTasks, 'すべて', false);
    // tobe 基本型を比較　<-> toequal 配列オブジェクトを比較
    expect(result.length).toBe(3);
  });

  it('priorityに指定した優先度のみが返る（正常系）', () => {
    const result = filterTasks(mockTasks, '高', false);
    expect(result.map(t => t.id)).toEqual(['1']);
  });

  it('hideDoneがtrueなら完了タスクを除外する（境界値・条件分岐）', () => {
    const result = filterTasks(mockTasks, 'すべて', true);
    // some 配列の中にはてハマる要素が一つでもあるかどうかをチェック
    expect(result.some(t => t.done)).toBe(false);
  });
});

// 要件2: ソートのテスト
describe('sortTasksByDueDate', () => {
  it('asc（昇順）で期限が古い順に並び替えられる（正常系）', () => {
    const result = sortTasksByDueDate(mockTasks, 'asc');
    expect(result.map(t => t.id)).toEqual(['1', '3', '2']); // 7/10 → 7/15 → 7/20
  });

  it('desc（降順）で期限が新しい順に並び替えられる（正常系）', () => {
    const result = sortTasksByDueDate(mockTasks, 'desc');
    expect(result.map(t => t.id)).toEqual(['2', '3', '1']); // 7/20 → 7/15 → 7/10
  });

  it('元の配列を変更しない（非破壊であること：必須要件）', () => {
    const copy = [...mockTasks];
    sortTasksByDueDate(mockTasks, 'asc');
    expect(mockTasks).toEqual(copy);
  });
});

// 要件3: 集計のテスト
describe('calcSummary', () => {
  it('正しく集計オブジェクトを返す（正常系）', () => {
    // 今日を 2026-07-17 とすると、未完了で7/15期限のタスクC(id: '3')が期限切れになる
    const result = calcSummary(mockTasks, '2026-07-17');
    expect(result).toEqual({
      total: 3,
      done: 1,
      doneRate: 33, // 1 / 3 = 33.333... → 四捨五入で33%
      overdue: 1,
    });
  });

  it('空配列を渡すとdoneRateは0になる（境界値・必須要件）', () => {
    const result = calcSummary([], '2026-07-17');
    expect(result).toEqual({
      total: 0,
      done: 0,
      doneRate: 0,
      overdue: 0,
    });
  });
});