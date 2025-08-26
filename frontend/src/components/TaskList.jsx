// src/components/TaskList.jsx
import React, { useState } from 'react'; // 1. Importamos o useState
import TaskItem from './TaskItem';
import { Box, Typography } from '@mui/material';

const mockTasks = [
  { id: 1, title: 'Dask In', subtitle: 'Ompeler', completed: false },
  { id: 2, title: 'Bick Destnake', subtitle: 'Ompeler', completed: true },
  { id: 3, title: 'Weh Fvist', subtitle: 'Ompeler', completed: false },
  { id: 4, title: 'Cack Tist', subtitle: 'Ompeler', completed: true },
  { id: 5, title: 'Aital Crich', subtitle: 'Ompeler', completed: false },
  { id: 6, title: 'Sewint', subtitle: 'Ompeler', completed: false },
];

function TaskList() {
  // 2. Usamos useState para tornar a lista de tarefas um "estado" dinâmico
  const [tasks, setTasks] = useState(mockTasks);

  // 3. Criamos a função que vai lidar com o clique no checkbox
  const handleToggleTask = (taskId) => {
    // Criamos um NOVO array com a tarefa modificada
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        // Se for a tarefa que clicamos, invertemos o status 'completed'
        return { ...task, completed: !task.completed };
      }
      return task; // Se não for, a mantemos como está
    });
    
    // 4. Atualizamos o estado com o novo array, e o React redesenha a lista
    setTasks(updatedTasks);
  };

  return (
    <Box 
      sx={{ 
        p: 2, 
        backgroundColor: 'white', 
        borderRadius: 3, 
        boxShadow: 3,
        width: '350px'
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        Tasks
      </Typography>
      
      <Box>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            id={task.id} // 5. Passamos o id da tarefa
            title={task.title}
            subtitle={task.subtitle}
            completed={task.completed}
            onToggle={handleToggleTask} // 6. Passamos a função de toggle como prop
          />
        ))}
      </Box>
    </Box>
  );
}

export default TaskList;