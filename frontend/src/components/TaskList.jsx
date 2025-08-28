// src/components/TaskList.jsx

import React, { useState } from 'react';
import TaskItem from './TaskItem';
import { Box, Typography, Button, IconButton, Paper, Stack } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TaskAdd from './TaskAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Recebe as props do Home.jsx
const TaskList = ({ tarefas, onAddTask, onDeleteTask, onUpdateTask, onSelectTask, activeTaskId }) => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleToggleStatus = (tarefa) => {
    const novoStatus = tarefa.status === 'concluida' ? 'pendente' : 'concluida';
    onUpdateTask(tarefa.id, { status: novoStatus });
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
        <IconButton> <MoreVertIcon /> </IconButton>
      </Typography>
      
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
        {tarefas.map(tarefa => {
            
            // --- LINHAS DE DEPURAÇÃO ADICIONADAS AQUI ---
            const isActive = tarefa.id === activeTaskId;
            console.log(`Verificando Tarefa ID: ${tarefa.id} (tipo: ${typeof tarefa.id}), ID Ativo: ${activeTaskId} (tipo: ${typeof activeTaskId}), É ativa? ${isActive}`);
            // --- FIM DAS LINHAS DE DEPURAÇÃO ---

            return (
                <TaskItem
                    key={tarefa.id}
                    task={tarefa}
                    onToggle={() => handleToggleStatus(tarefa)}
                    onSelect={() => onSelectTask(tarefa)}
                    isActive={isActive} // Passa o resultado da verificação
                    onDelete={onDeleteTask}
                    onUpdate={onUpdateTask}
                />
            );
        })}
      </Box>
    </Box>
  );
}

export default TaskList;