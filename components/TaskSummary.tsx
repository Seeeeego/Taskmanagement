import { type Task } from '../types';
import { calcSummary } from '../utils/taskUtils';
import Panel from './Panel';

export default function TaskSummary({ tasks }: { tasks: Task[] }) {
  const todayStr = new Date().toISOString().split('T')[0];
  const { total, done, doneRate, overdue } = calcSummary(tasks, todayStr);

  return (
    <Panel title="全体の進捗">
      <p>
        タスク総数: {total}件 / 
        完了: {done}件 ({doneRate}%)
      </p>
      {/* C-3: 条件分岐レンダリング (&&) */}
      {overdue > 0 && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          ⚠️ 期限切れの未完了タスクが {overdue} 件あります！
        </p>
      )}
    </Panel>
  );
}