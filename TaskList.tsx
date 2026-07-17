import React from 'react';
import { type Task } from './types';
import { Panel } from './Panel';
import { TaskItem } from './TaskItem';
import { subStyles } from './styles';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  return (
    <Panel title="タスク一覧">
      {tasks.length === 0 ? (
        <p style={subStyles.emptyText}>該当するタスクはありません。</p>
      ) : (
        <ul style={subStyles.list}>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </Panel>
  );
}