import React, { useState } from 'react';
import TaskItem from './TaskItem';
import { Box, Typography, Button, IconButton, Paper, Popper, Stack } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TaskAdd from './TaskAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const TaskList = ({ tarefas, onAddTask, onDeleteTask, onUpdateTask, onSelectTask, activeTaskId }) => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const openAnchor = Boolean(anchorEl);
  const id = openAnchor ? 'simple-popper' : undefined;

  const handleToggleTask = (task) => {
    const newStatus = task.status === 'concluida' ? 'pendente' : 'concluida';
    onUpdateTask(task.id, { status: newStatus });
  };

  return (
    <Box 
      sx={{ p: 2, backgroundColor: 'white', borderRadius: 3, boxShadow: 3, width: '350px' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2, color:'black' }}>
          Tasks
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        </Typography>
      </Box>

      <Popper id={id} open={openAnchor} anchorEl={anchorEl} placement='right-start'>
          {/* Seu código do menu Popper aqui */}
      </Popper>
      
      <Button
        fullWidth
        onClick={() => setAddModalOpen(true)}
        sx={{
          display: 'flex', alignItems: 'center', p: 1.5, mb: 1.5,
          borderRadius: 2, border: '1px dashed #aaa', textTransform: 'none',
          '&:hover': { backgroundColor: '#f5f5f5' }
        }}
      >
        <AddCircleIcon sx={{ paddingRight: '6px' }} />
        Adicionar Task
      </Button>
      
      <TaskAdd open={addModalOpen} onClose={() => setAddModalOpen(false)} onSave={onAddTask} />

      <Box>
        {tarefas.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => handleToggleTask(task)}
            onSelect={() => onSelectTask(task)}
            isActive={task.id === activeTaskId}
            onDelete={onDeleteTask}
            onUpdate={onUpdateTask}
          />
        ))}
      </Box>
    </Box>
  );
}

export default TaskList;