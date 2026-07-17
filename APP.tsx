import React, { useState } from 'react';
import { type Task, type PriorityFilter, type SortOrder, type TaskFormData } from './types';
import { TaskSummary } from './TaskSummary';
import { TaskFilter } from './TaskFilter';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { appStyles } from './styles';

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('すべて');
  const [hideDone, setHideDone] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleAddTask = (formData: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: formData.title,
      assignee: formData.assignee,
      priority: formData.priority as Task['priority'],
      dueDate: formData.dueDate,
      done: false,
      memo: formData.memo || undefined,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredAndSortedTasks = tasks
    .filter(task => {
      if (hideDone && task.done) return false;
      if (priorityFilter !== 'すべて' && task.priority !== priorityFilter) return false;
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <div style={appStyles.container}>
      <h2 style={appStyles.header}>
        TeamTasks
      </h2>
      
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
        tasks={filteredAndSortedTasks} 
        onToggle={handleToggleTask} 
        onDelete={handleDeleteTask} 
      />

      <TaskForm onAdd={handleAddTask} />
    </div>
  );
}