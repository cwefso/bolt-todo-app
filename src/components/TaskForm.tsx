import React, { useState, useEffect } from 'react';
import { Priority } from '../types';
import { useTaskContext } from '../context/TaskContext';

interface TaskFormProps {
  taskId?: string;
  onClose?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskId, onClose }) => {
  const { tasks, addTask, editTask } = useTaskContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [errors, setErrors] = useState({ title: '' });

  const isEditMode = Boolean(taskId);

  useEffect(() => {
    if (taskId) {
      const taskToEdit = tasks.find((task) => task.id === taskId);
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description);
        setPriority(taskToEdit.priority);
      }
    }
  }, [taskId, tasks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrors({ title: 'Title is required' });
      return;
    }

    if (isEditMode && taskId) {
      editTask(taskId, title, description, priority);
    } else {
      addTask(title, description, priority);
    }

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setErrors({ title: '' });

    if (onClose) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Task Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value.trim()) {
              setErrors({ title: '' });
            }
          }}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          placeholder="Enter task title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter task description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
        <div className="flex space-x-4">
          <PriorityButton
            priority="low"
            currentPriority={priority}
            onClick={() => setPriority('low')}
          />
          <PriorityButton
            priority="medium"
            currentPriority={priority}
            onClick={() => setPriority('medium')}
          />
          <PriorityButton
            priority="high"
            currentPriority={priority}
            onClick={() => setPriority('high')}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isEditMode ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

interface PriorityButtonProps {
  priority: Priority;
  currentPriority: Priority;
  onClick: () => void;
}

const PriorityButton: React.FC<PriorityButtonProps> = ({
  priority,
  currentPriority,
  onClick,
}) => {
  const colors = {
    low: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
      activeBg: 'bg-green-500',
      activeText: 'text-white',
    },
    medium: {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      border: 'border-amber-200',
      activeBg: 'bg-amber-500',
      activeText: 'text-white',
    },
    high: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-200',
      activeBg: 'bg-red-500',
      activeText: 'text-white',
    },
  };

  const isActive = priority === currentPriority;
  const colorSet = colors[priority];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 border rounded-md shadow-sm text-sm font-medium 
      transition-colors duration-200 flex-1
      ${
        isActive
          ? `${colorSet.activeBg} ${colorSet.activeText} border-transparent`
          : `${colorSet.bg} ${colorSet.text} ${colorSet.border} hover:bg-opacity-80`
      }`}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </button>
  );
};

export default TaskForm;