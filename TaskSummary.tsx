import React from 'react';
import { type Task } from './types';
import { Panel } from './Panel';
import { subStyles } from './styles';

interface TaskSummaryProps {
  tasks: Task[];
}

export function TaskSummary({ tasks }: TaskSummaryProps) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  const todayStr = new Date().toISOString().split('T')[0];
  const overdue = tasks.filter(t => !t.done && t.dueDate < todayStr).length;

  return (
    <Panel title="[集計]">
      <p style={subStyles.summaryText(overdue > 0)}>
        タスク: <strong>{total}</strong>件 / 
        完了: <strong>{completed}</strong>件 ({percent}%) / 
        期限切れ: <strong style={subStyles.overdueCount(overdue > 0)}>{overdue}</strong>件
      </p>
    </Panel>
  );
}