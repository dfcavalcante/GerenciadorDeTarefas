// src/components/TaskItem.jsx
import React from 'react';
import { Box, Typography, Checkbox, Button } from '@mui/material';
import { RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';
import Task from './TaskInfo';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// 1. Recebemos as novas props: id e onToggle
function TaskItem({ id, title, subtitle, completed, onToggle }) {

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 1.5,
        mb: 1.5,
        backgroundColor: completed ? '#f0f4f8' : '#fafafa',
        borderRadius: 2,
        border: '1px solid #eee',
        transition: 'background-color 0.3s',
        opacity: completed ? 0.7 : 1,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f5f5f5'
        }
      }}
      onClick={() => onToggle(id)}
    >
      {/* Esquerda: Checkbox + texto */}
      <Box sx={{ display: 'flex', alignItems: 'center', flex:1 }}>
        <Checkbox
          checked={completed}
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

      {/* Esse botão é para levar ao taskInfo*/}
      <Button  
        size="small"     
        sx={{ p: 0, ml: 1 }} 
      >
        <MoreVertIcon  fontSize='small'/>
      </Button>
    </Box>
  );
}

export default TaskItem;