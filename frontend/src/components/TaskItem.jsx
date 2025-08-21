// src/components/TaskItem.jsx
import React from 'react';

// Usamos "props" para passar dados para o componente (ex: o texto da tarefa)
function TaskItem({ title, subtitle }) {
  return (
    <div className="task-item">
      <input type="checkbox" />
      <div className="task-details">
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export default TaskItem;