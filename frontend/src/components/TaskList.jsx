import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskAdd from './TaskAdd';
import { Box, Typography, Button, IconButton, Paper, Stack, Popper } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Recebe todas as funções e dados como props
function TaskList({ tarefas, onAddTask, onDeleteTask, onUpdateTask, onToggleTask, onSelectTask, activeTaskId }) {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const openAnchor = Boolean(anchorEl);
    const id = openAnchor ? 'simple-popper' : undefined;

    return (
        <Box
            sx={{
                p: 2, backgroundColor: 'white', borderRadius: 3, boxShadow: 3, width: '350px',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ mb: 2, color: 'black' }}>
                    Tasks
                    <IconButton onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                </Typography>
            </Box>

            <Popper id={id} open={openAnchor} anchorEl={anchorEl} placement='right-start'>
                <Paper elevation={3} sx={{ borderRadius: '5px' }} >
                    <Stack spacing={1} sx={{ padding: '10px' }} >
                        <Button sx={{ justifyContent: 'flex-start' }}><DeleteIcon /><Typography variant='body2'>Excluir todas as tarefas</Typography></Button>
                        <Button sx={{ justifyContent: 'flex-start' }}><ClearIcon /><Typography variant='body2'>Excluir tarefas concluidas</Typography></Button>
                        <Button sx={{ justifyContent: 'flex-start' }}><VisibilityOffIcon /><Typography variant='body2'>Esconder tarefas concluidas</Typography></Button>
                    </Stack>
                </Paper>
            </Popper>

            <Button
                fullWidth
                onClick={() => setOpenAddModal(true)}
                sx={{
                    display: 'flex', alignItems: 'center', p: 1.5, mb: 1.5,
                    borderRadius: 2, border: '1px dashed #aaa', textTransform: 'none',
                    '&:hover': { backgroundColor: '#f5f5f5' }
                }}
            >
                <AddCircleIcon sx={{ paddingRight: '6px' }} />
                Adicionar Task
            </Button>

            <TaskAdd open={openAddModal} onClose={() => setOpenAddModal(false)} onSave={onAddTask} />

            <Box>
                {tarefas.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={() => onToggleTask(task)} // Passa a função de toggle
                        onDelete={onDeleteTask}
                        onUpdate={onUpdateTask}
                        onSelect={() => onSelectTask(task)} // Passa a função de seleção
                        isActive={activeTaskId === task.id} // Informa se o item está ativo
                    />
                ))}
            </Box>
        </Box>
    );
}

export default TaskList;