// src/components/TaskItem.jsx
import React, { useState } from 'react';
import { Box, Typography, Checkbox, IconButton } from '@mui/material';
import { RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';
import TaskInfo from './TaskInfo';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// ALTERAÇÃO: Recebemos o objeto 'task' inteiro e as novas funções onUpdate e onDelete
function TaskItem({ task, onToggle, onUpdate, onDelete }) {
    //abrir e fechar o taskInfo
    const [openInfo, setOpenInfo] = useState(false);

    return (
        <Box sx={{ /* ... seus estilos ... */ }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Checkbox
                    checked={task.status === 'concluida'} // ALTERAÇÃO: Usa task.status
                    onChange={onToggle} // onToggle continua igual
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<CheckCircle />}
                    sx={{ mr: 1.5 }}
                />
                <Box>
                    <Typography variant="body1" sx={{ /* ... seus estilos ... */ }}>
                        {task.titulo}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {`Prioridade: ${task.prioridade}`} 
                    </Typography>
                </Box>
            </Box>

            {/* Esse botão é para levar ao taskInfo*/}
            <IconButton
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenInfo(true);
                }}
            >
                <MoreVertIcon />
            </IconButton>

            {/* ALTERAÇÃO: Passamos a tarefa e as funções para o TaskInfo */}
            <TaskInfo
                open={openInfo}
                onClose={() => setOpenInfo(false)}
                task={task}
                onSave={onUpdate}
                onDelete={onDelete}
            />
        </Box>
    );
}

export default TaskItem;