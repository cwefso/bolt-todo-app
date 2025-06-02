import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import TodoPage from './pages/TodoPage';
import CompletedPage from './pages/CompletedPage';

function App() {
  return (
    <Router>
      <TaskProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<TodoPage />} />
              <Route path="/completed" element={<CompletedPage />} />
            </Routes>
          </main>
        </div>
      </TaskProvider>
    </Router>
  );
}

export default App;