import { type Task } from '../types';

export default function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const todayStr = new Date().toISOString().split('T')[0];
  const isOverdue = !task.done && task.dueDate < todayStr;

  return (
    <li>
      <div>
        <label>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggle(task.id)}
          />
          {/* 完了しているタスクは標準的なsタグ（打ち消し線）のみで表現 */}
          {task.done ? <s>{task.title}</s> : <span>{task.title}</span>}
        </label>

        <span>
          {' '}(優先度: {task.priority} | 期限: {task.dueDate}){' '}
        </span>

        {isOverdue && <span style={{ color: 'red' }}>⚠️期限切れ</span>}

        <button type="button" onClick={() => {
          if (window.confirm(`「${task.title}」を削除してもよろしいですか？`)) {
            onDelete(task.id);
          }
        }}>
          削除
        </button>
      </div>
      
      {(task.assignee || task.memo) && (
        <div style={{ marginLeft: '20px', fontSize: '0.9em', color: '#666' }}>
          担当: {task.assignee} {task.memo && `| メモ: ${task.memo}`}
        </div>
      )}
    </li>
  );
}