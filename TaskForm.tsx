import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { taskSchema, type TaskFormData } from './types';
import { Panel } from './Panel';
import { formStyles } from './styles';

interface TaskFormProps {
  onAdd: (data: TaskFormData) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const todayStr = new Date().toISOString().split('T')[0];

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: { 
      title: '', 
      assignee: '', 
      priority: '中', 
      dueDate: todayStr, 
      memo: '' 
    }
  });

  const onSubmit = (data: TaskFormData) => {
    onAdd(data);
    reset({
      title: '',
      assignee: '',
      priority: '中',
      dueDate: todayStr,
      memo: ''
    });
  };

  return (
    <Panel title="タスクを追加">
      <form onSubmit={handleSubmit(onSubmit)} style={formStyles.form}>
        <div style={formStyles.row}>
          <div style={formStyles.titleField}>
            <input {...register('title')} placeholder="タスク名" style={formStyles.input} />
            {errors.title && <div style={formStyles.errorText}>{errors.title.message}</div>}
          </div>
          <div style={formStyles.assigneeField}>
            <input {...register('assignee')} placeholder="担当者" style={formStyles.input} />
            {errors.assignee && <div style={formStyles.errorText}>{errors.assignee.message}</div>}
          </div>
        </div>

        <div style={formStyles.metaRow}>
          <div>
            <span style={{ marginRight: '8px' }}>優先度:</span>
            <label style={formStyles.radioLabel}><input type="radio" value="高" {...register('priority')} /> 高</label>
            <label style={formStyles.radioLabel}><input type="radio" value="中" {...register('priority')} /> 中</label>
            <label><input type="radio" value="低" {...register('priority')} /> 低</label>
          </div>

          <div>
            <span style={{ marginRight: '4px' }}>期限:</span>
            <input type="date" {...register('dueDate')} style={{ padding: '2px' }} />
          </div>
        </div>

        <div>
          <input {...register('memo')} placeholder="メモ (任意)" style={formStyles.input} />
        </div>

        <div style={formStyles.submitRow}>
          <button type="submit" style={formStyles.submitButton}>追加</button>
        </div>
      </form>
    </Panel>
  );
}