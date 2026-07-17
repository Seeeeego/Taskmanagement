import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { type Task } from '../types';
import { taskSchema } from '../schemas/taskSchema';
import Panel from './Panel';

export default function TaskForm({
  onAdd,
}: {
  // 親コンポーネントに渡すコールバック関数の型。既存の型定義のみを再利用
  onAdd: (data: Omit<Task, 'id' | 'done'>) => void;
}) {
  const todayStr = new Date().toISOString().split('T')[0];

  // 【解決策】useFormのジェネリクス（<...>）を取り払い、
  // resolver と defaultValues から TypeScript に正しい型を自動で推論させます。
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: '',
      assignee: '',
      priority: '中' as const, // リテラル型として認識させるために as const を付与
      dueDate: todayStr,
      memo: '',
    },
  });

  // onSubmit の引数の型は handleSubmit が推論してくれるため、型注釈を省略します
  const onSubmit = (data: any) => {
    // 親の Task 互換の型に整理してデータを引き渡す
    onAdd({
      title: data.title,
      assignee: data.assignee,
      priority: data.priority as Task['priority'],
      dueDate: data.dueDate,
      memo: data.memo || undefined,
    });

    // 送信完了後にフォームを初期値にリセット
    reset({
      title: '',
      assignee: '',
      priority: '中',
      dueDate: todayStr,
      memo: '',
    });
  };

  return (
    <Panel title="新規タスク登録">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            タスク名: 
            <input {...register('title')} placeholder="タスクを入力" />
          </label>
          {errors.title && <div style={{ color: 'red' }}>{errors.title.message}</div>}
        </div>

        <div>
          <label>
            担当者名: 
            <input {...register('assignee')} placeholder="名前を入力" />
          </label>
          {errors.assignee && <div style={{ color: 'red' }}>{errors.assignee.message}</div>}
        </div>

        <div>
          <label>
            優先度: 
            <select {...register('priority')}>
              <option value="高">高</option>
              <option value="中">中</option>
              <option value="低">低</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            期限: 
            <input type="date" {...register('dueDate')} />
          </label>
          {errors.dueDate && <div style={{ color: 'red' }}>{errors.dueDate.message}</div>}
        </div>

        <div>
          <label>
            メモ: 
            <input {...register('memo')} placeholder="任意" />
          </label>
        </div>

        <button type="submit">追加</button>
      </form>
    </Panel>
  );
}