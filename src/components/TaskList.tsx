import React, { useState } from 'react';
import { Task, Priority } from '../types';
import TaskItem from './TaskItem';
import { Filter } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  emptyMessage: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, emptyMessage }) => {
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredTasks = priorityFilter === 'all' 
    ? tasks 
    : tasks.filter(task => task.priority === priorityFilter);

  const handleFilterChange = (value: Priority | 'all') => {
    setPriorityFilter(value);
    setIsFilterOpen(false);
  };

  return (
    <div>
      {tasks.length > 0 && (
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} 
            {priorityFilter !== 'all' ? ` with ${priorityFilter} priority` : ''}
          </p>
          
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center text-sm text-gray-600 px-3 py-1 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <Filter size={14} className="mr-1" />
              {priorityFilter === 'all' ? 'All Priorities' : `${priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1)} Priority`}
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 z-10 mt-1 w-48 bg-white shadow-lg rounded-md border border-gray-200 py-1">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    priorityFilter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All Priorities
                </button>
                <button
                  onClick={() => handleFilterChange('high')}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    priorityFilter === 'high' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  High Priority
                </button>
                <button
                  onClick={() => handleFilterChange('medium')}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    priorityFilter === 'medium' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Medium Priority
                </button>
                <button
                  onClick={() => handleFilterChange('low')}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    priorityFilter === 'low' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Low Priority
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {filteredTasks.length > 0 ? (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;