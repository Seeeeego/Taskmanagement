import React from 'react';
import { type Task } from '../types';
import Panel from './Panel';
import TaskItem from './TaskItem';

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
}: {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Panel title="タスク一覧">
      {tasks.length === 0 ? (
        <p>該当するタスクはありません。</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </Panel>
  );
}