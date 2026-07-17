import { type Priority } from '../types';

export default function TaskFilter({
  priorityFilter,
  hideDone,
  sortOrder,
  onChangePriority,
  onChangeHideDone,
  onChangeSort,
}: {
  priorityFilter: Priority | 'すべて';
  hideDone: boolean;
  sortOrder: 'asc' | 'desc';
  onChangePriority: (priority: Priority | 'すべて') => void;
  onChangeHideDone: (hide: boolean) => void;
  onChangeSort: (sort: 'asc' | 'desc') => void;
}) {
  const priorities: (Priority | 'すべて')[] = ['すべて', '高', '中', '低'];

  return (
    <fieldset>
      <legend>フィルターとソート</legend>
      <div>
        <label>
          優先度: 
          <select
            value={priorityFilter}
            onChange={(e) => onChangePriority(e.target.value as Priority | 'すべて')}
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        
        {' | '}

        <label>
          <input
            type="checkbox"
            checked={hideDone}
            onChange={(e) => onChangeHideDone(e.target.checked)}
          />
          完了を非表示
        </label>
        
        {' | '}

        <button
          type="button"
          onClick={() => onChangeSort(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          期限順で並び替え ({sortOrder === 'asc' ? '昇順 ▲' : '降順 ▼'})
        </button>
      </div>
    </fieldset>
  );
}