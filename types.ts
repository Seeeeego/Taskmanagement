import * as yup from 'yup';

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

// フィルター・ソート用の追加型定義
export type PriorityFilter = 'すべて' | Priority;
export type SortOrder = 'asc' | 'desc';

// Yup バリデーションスキーマ
export const taskSchema = yup.object({
  title: yup
    .string()
    .transform((value) => (typeof value === 'string' ? value.trim() : value))
    .required('タスク名は必須入力です。')
    .max(30, 'タスク名は30文字以内で入力してください。'),
  assignee: yup
    .string()
    .required('担当者は必須入力です。')
    .max(10, '担当者は10文字以内で入力してください。'),
  priority: yup
    .string()
    .oneOf(['高', '中', '低'] as const, '優先度は正しく選択してください。')
    .required('優先度は必須入力です。'),
  dueDate: yup
    .string()
    .required('期限は必須入力です。')
    .test('is-future', '期限には今日以降の日付を指定してください。', (value) => {
      if (!value) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const inputDate = new Date(value);
      inputDate.setHours(0, 0, 0, 0);
      return inputDate >= today;
    }),
  memo: yup
    .string()
    .optional()
    .max(100, 'メモは100文字以内で入力してください。'),
});

// React Hook Form 用の型（done と id を除いた登録フォーム用）
export type TaskFormData = yup.InferType<typeof taskSchema>;