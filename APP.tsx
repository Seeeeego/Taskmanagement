import { useState } from 'react';
import { type Task, type Priority } from './types';
import TaskSummary from './components/TaskSummary';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { filterTasks, sortTasksByDueDate } from './utils/taskUtils';

export default function App() {
  // C-5: Stateはすべて親コンポーネントに集約
  const [tasks, setTasks] = useState<Task[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'すべて'>('すべて');
  const [hideDone, setHideDone] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleAddTask = (formData: Omit<Task, 'id' | 'done'>) => {
    const newTask: Task = {
      id: crypto.randomUUID(), // C-2用に一意なIDを設定
      title: formData.title,
      assignee: formData.assignee,
      priority: formData.priority,
      dueDate: formData.dueDate,
      done: false,
      memo: formData.memo || undefined,
    };
    setTasks((prev) => [...prev, newTask]); // C-6: 非破壊で更新
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const processedTasks = sortTasksByDueDate(
    filterTasks(tasks, priorityFilter, hideDone),
    sortOrder
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>TeamTasks </h2>

      {/* C-5: コールバックPropsでState管理をリフトアップ */}
      <TaskSummary tasks={tasks} />

      <TaskFilter
        priorityFilter={priorityFilter}
        hideDone={hideDone}
        sortOrder={sortOrder}
        onChangePriority={setPriorityFilter}
        onChangeHideDone={setHideDone}
        onChangeSort={setSortOrder}
      />

      <TaskList
        tasks={processedTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />

      <TaskForm onAdd={handleAddTask} />
    </div>
  );
}