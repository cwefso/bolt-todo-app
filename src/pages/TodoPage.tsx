import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Plus, X } from 'lucide-react';

const TodoPage: React.FC = () => {
  const { tasks } = useTaskContext();
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const activeTasks = tasks.filter(task => !task.completed);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">To Dos</h2>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          {isFormVisible ? (
            <>
              <X size={16} className="mr-1" /> Cancel
            </>
          ) : (
            <>
              <Plus size={16} className="mr-1" /> Add Task
            </>
          )}
        </button>
      </div>

      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6 animate-fadeIn">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Task</h3>
          <TaskForm onClose={() => setIsFormVisible(false)} />
        </div>
      )}

      <TaskList 
        tasks={activeTasks} 
        emptyMessage={
          isFormVisible
            ? "Add your first task using the form above"
            : "No tasks to do! Click 'Add Task' to create one"
        } 
      />
    </div>
  );
};

export default TodoPage;