import React, { useState } from 'react';
import { Task } from '../types';
import { Pencil, Trash2 } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import TaskForm from './TaskForm';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);

  const getPriorityClasses = () => {
    switch (task.priority) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Task</h3>
        <TaskForm taskId={task.id} onClose={() => setIsEditing(false)} />
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {task.title}
        </h3>
        <div className="flex space-x-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityClasses()}`}
          >
            {task.priority}
          </span>
        </div>
      </div>
      
      <p className={`text-sm mb-4 ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
        {task.description || 'No description provided'}
      </p>
      
      <div className="flex justify-between items-center">
        <button
          onClick={() => toggleTaskCompletion(task.id)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
            task.completed
              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
          }`}
        >
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        
        <div className="flex space-x-2">
          {!task.completed && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 rounded text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Edit task"
            >
              <Pencil size={16} />
            </button>
          )}
          
          <button
            onClick={() => deleteTask(task.id)}
            className="p-1 rounded text-gray-500 hover:text-red-600 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;