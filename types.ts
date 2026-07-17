export type Priority = '高' | '中' | '低';

export type Task = {
  id: string;        // crypto.randomUUID() で採番
  title: string;     // タスク名
  assignee: string;  // 担当者
  priority: Priority;// 優先度
  dueDate: string;   // 期限（'YYYY-MM-DD' 形式の文字列）
  done: boolean;     // 完了フラグ
  memo?: string;     // メモ
};