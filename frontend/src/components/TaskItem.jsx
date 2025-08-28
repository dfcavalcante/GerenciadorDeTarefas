// src/components/TaskItem.jsx

import React, { useState } from 'react';
import { Box, Typography, Checkbox, IconButton } from '@mui/material';
import { RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';
import TaskInfo from './TaskInfo';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const TaskItem = ({ task, onToggle, onDelete, onUpdate, onSelect, isActive }) => {
    const [openInfo, setOpenInfo] = useState(false);

    const handleToggleStatus = () => {
        const newStatus = task.status === 'concluida' ? 'pendente' : 'concluida';
        onUpdate(task.id, { status: newStatus });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1.5,
                mb: 1.5,
                backgroundColor: task.status === 'concluida' ? '#f0f4f8' : '#fafafa',
                borderRadius: 2,
                border: isActive ? '2px solid #1976d2' : '1px solid #eee',
                transition: 'all 0.2s',
                opacity: task.status === 'concluida' ? 0.7 : 1,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Checkbox
                    checked={task.status === 'concluida'}
                    onChange={handleToggleStatus}
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<CheckCircle />}
                    sx={{ mr: 1.5 }}
                />
                <Box>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: '500',
                            textDecoration: task.status === 'concluida' ? 'line-through' : 'none',
                            color: task.status === 'concluida' ? '#757575' : '#212121',
                        }}
                    >
                        {task.titulo}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {`Prioridade: ${task.prioridade} | Pomodoros: ${task.pomodoros_concluidos || 0}`}
                    </Typography>
                </Box>
            </Box>

            <IconButton onClick={onSelect} title="Focar nesta tarefa">
                <PlayCircleOutlineIcon />
            </IconButton>

            <IconButton
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenInfo(true);
                }}
            >
                <MoreVertIcon />
            </IconButton>

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