// src/components/TaskItem.jsx
import React from 'react';
import { Box, Typography, Checkbox } from '@mui/material';
import { RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';

// 1. Recebemos as novas props: id e onToggle
function TaskItem({ id, title, subtitle, completed, onToggle }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1.5,
        mb: 1.5,
        backgroundColor: completed ? '#f0f4f8' : '#fafafa',
        borderRadius: 2,
        border: '1px solid #eee',
        transition: 'background-color 0.3s',
        opacity: completed ? 0.7 : 1,
        cursor: 'pointer', // Adiciona o cursor de "clicável"
        '&:hover': {
            backgroundColor: '#f5f5f5'
        }
      }}
      // 2. Adicionamos um onClick no Box inteiro para facilitar
      onClick={() => onToggle(id)}
    >
      <Checkbox
        checked={completed}
        // 3. O onChange aqui também chama a função, passando o id da tarefa "para cima"
        onChange={() => onToggle(id)}
        icon={<RadioButtonUnchecked />}
        checkedIcon={<CheckCircle />}
        sx={{ mr: 1.5 }}
      />
      
      <Box>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: '500',
            textDecoration: completed ? 'line-through' : 'none',
            color: completed ? '#757575' : '#212121',
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

export default TaskItem;