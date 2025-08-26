// src/components/TaskList.jsx
import React, { useState } from 'react'; // 1. Importamos o useState
import TaskItem from './TaskItem';
import { Box, Typography, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
        width: '350px',
        
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, color:'black' }}>
        Tasks
      </Typography>
      
      {/*Aq é a box para adicionar mais tasks*/}
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        p: 1.5,
        mb: 1.5,
        borderRadius: 2,
        border: '1px solid #eee',
        transition: 'background-color 0.3s',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#f5f5f5'
        }
      }}>
        <Button>
          <AddCircleIcon sx={{paddingRight:'3px'}}/>
          Adicionar Task
        </Button>
      </Box>

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