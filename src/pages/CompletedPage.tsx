import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskList from '../components/TaskList';

const CompletedPage: React.FC = () => {
  const { tasks } = useTaskContext();
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Completed Tasks</h2>
      <TaskList 
        tasks={completedTasks} 
        emptyMessage="No completed tasks yet. Tasks will appear here when marked as complete." 
      />
    </div>
  );
};

export default CompletedPage;