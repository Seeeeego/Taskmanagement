import React from 'react';
import { type Task } from './types';
import { subStyles } from './styles';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const todayStr = new Date().toISOString().split('T')[0];
  const isOverdue = !task.done && task.dueDate < todayStr;

  const formatMMDD = (dateStr: string) => {
    const parts = dateStr.split('-');
    return parts.length === 3 ? `${parts[1]}/${parts[2]}` : dateStr;
  };

  const handleCancelClick = () => {
    if (window.confirm(`「${task.title}」を削除してもよろしいですか？`)) {
      onDelete(task.id);
    }
  };

  return (
    <li style={subStyles.listItem(task.done)}>
      <div style={subStyles.itemRow}>
        <label style={subStyles.itemLabel(task.done)}>
          <input 
            type="checkbox" 
            checked={task.done} 
            onChange={() => onToggle(task.id)} 
            style={subStyles.itemCheckbox}
          />
          <span style={subStyles.itemText(task.done)}>
            {task.title}
          </span>
        </label>
        
        <div style={subStyles.itemMeta}>
          <span>[{task.priority}]</span>
          <span>期限: {formatMMDD(task.dueDate)}</span>
          {isOverdue && <span style={subStyles.overdueBadge}>⚠️期限切れ</span>}
          <button 
            type="button" 
            onClick={handleCancelClick}
            style={subStyles.deleteButton}
          >
            [削除]
          </button>
        </div>
      </div>
      {task.memo && (
        <p style={subStyles.memoText}>
          担当: {task.assignee} | メモ: {task.memo}
        </p>
      )}
    </li>
  );
}