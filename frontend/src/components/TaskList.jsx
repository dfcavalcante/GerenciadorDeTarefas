// src/components/TaskList.jsx
import React, { useState } from 'react'; // 1. Importamos o useState
import TaskItem from './TaskItem';
import { Box, Typography, Button, IconButton, Card, Popper, Stack, Paper } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TaskAdd from './TaskAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { VisibilityOff } from '@mui/icons-material';


const mockTasks = [
  { id: 1, title: 'Dask In', subtitle: 'Ompeler', completed: false },
  { id: 2, title: 'Bick Destnake', subtitle: 'Ompeler', completed: false },
  { id: 3, title: 'Weh Fvist', subtitle: 'Ompeler', completed: false },
  { id: 4, title: 'Cack Tist', subtitle: 'Ompeler', completed: false },
  { id: 5, title: 'Aital Crich', subtitle: 'Ompeler', completed: false },
  { id: 6, title: 'Sewint', subtitle: 'Ompeler', completed: false },
];

function TaskList() {
  // 2. Usamos useState para tornar a lista de tarefas um "estado" dinâmico
  const [tasks, setTasks] = useState(mockTasks);
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const openAnchor = Boolean(anchorEl);
  const id = openAnchor ? 'simple-popper' : undefined;

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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2, color:'black' }}>
          Tasks

        <IconButton 
        onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>

        </Typography>

      </Box>

        {/*dps integrar isso no backend*/}
        <Popper id={id} open={openAnchor} anchorEl={anchorEl} placement='right-start'>
          <Paper elevation={3} sx={{borderRadius:'5px'}} >
            <Stack spacing={1} sx={{padding:'10px'}} >
              <Button sx={{justifyContent:'flex-start'}}>
                <DeleteIcon/>
                <Typography variant='body2'>Excluir todas as tarefas </Typography>
              </Button>
              
              <Button sx={{justifyContent:'flex-start'}}>
                <ClearIcon/>
                <Typography variant='body2'>Excluir tarefas concluidas </Typography>
              </Button>

              <Button sx={{justifyContent:'flex-start'}}>
                <VisibilityOffIcon/>
                <Typography variant='body2'>Esconder tarefas concluidas </Typography>
              </Button>
              
            
            </Stack>
          </Paper>
        </Popper>
      
      {/*Aq é a box para adicionar mais tasks*/}
      <Button
        fullWidth
        onClick={() => setOpen(true)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1.5,
          mb: 1.5,
          borderRadius: 2,
          border: '1px dashed #aaa',  
          transition: 'background-color 0.3s',
          cursor: 'pointer',
          textTransform: 'none', 
          '&:hover': {
            backgroundColor: '#f5f5f5'
          }
        }}
      >
        <AddCircleIcon sx={{ paddingRight: '6px' }} />
        Adicionar Task
      </Button>

        
      <TaskAdd open={open} onClose={() => setOpen(false)} />

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