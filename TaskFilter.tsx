import React from 'react';
import { type PriorityFilter, type SortOrder } from './types';
import { Panel } from './Panel';
import { subStyles } from './styles';

interface TaskFilterProps {
  priorityFilter: PriorityFilter;
  hideDone: boolean;
  sortOrder: SortOrder;
  onChangePriority: (p: PriorityFilter) => void;
  onChangeHideDone: (h: boolean) => void;
  onChangeSort: (s: SortOrder) => void;
}

export function TaskFilter({
  priorityFilter, hideDone, sortOrder, onChangePriority, onChangeHideDone, onChangeSort
}: TaskFilterProps) {
  const priorities: PriorityFilter[] = ['すべて', '高', '中', '低'];

  return (
    <Panel title="コントロール">
      <div style={subStyles.filterContainer}>
        <div style={subStyles.filterRow}>
          <div>
            <span>絞り込み: </span>
            <select 
              value={priorityFilter} 
              onChange={e => onChangePriority(e.target.value as PriorityFilter)}
              style={subStyles.select}
            >
              {priorities.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <label style={subStyles.checkboxLabel}>
            <input 
              type="checkbox" 
              checked={hideDone} 
              onChange={e => onChangeHideDone(e.target.checked)} 
              style={subStyles.checkbox}
            />
            完了タスクを隠す
          </label>
        </div>

        <div>
          <span>並び替え: </span>
          <button 
            type="button" 
            onClick={() => onChangeSort(sortOrder === 'asc' ? 'desc' : 'asc')}
            style={subStyles.sortButton}
          >
            期限順 {sortOrder === 'asc' ? '▲' : '▼'}
          </button>
        </div>
      </div>
    </Panel>
  );
}