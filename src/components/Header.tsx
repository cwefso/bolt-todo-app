import React from 'react';
import { NavLink } from 'react-router-dom';
import { CheckSquare } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <CheckSquare className="h-6 w-6 text-indigo-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">TaskMaster</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`
                }
                end
              >
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/completed"
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`
                }
              >
                Completed
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;