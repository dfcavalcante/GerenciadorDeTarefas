// src/App.jsx

import React from 'react';
import './App.css'; // Mantenha este import para os estilos globais
import TaskList from './components/TaskList';
import PomodoroTimer from './components/PomodoroTimer';

function App() {
  return (
    <main className="dashboard">
      {/* Futuramente aqui entrará o Header */}
      <div className="main-content">
        <TaskList />
        <div className="right-panel">
          <PomodoroTimer />
          {/* Futuramente aqui entrará o ProductivityChart */}
        </div>
      </div>
    </main>
  );
}

export default App;