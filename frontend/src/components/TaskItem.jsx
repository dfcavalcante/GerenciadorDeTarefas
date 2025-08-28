import React, { useState } from 'react';
import { Box, Typography, Checkbox, IconButton } from '@mui/material';
import { RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';
import TaskInfo from './TaskInfo';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

// Pequena função para formatar a data para o padrão brasileiro (dd/mm/aaaa)
const formatDate = (dateString) => {
    if (!dateString) return 'Sem data';
    const date = new Date(dateString);
    // Ajuste para evitar problemas de fuso horário que mudam o dia
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
    return adjustedDate.toLocaleDateString('pt-BR');
};

const TaskItem = ({ task, onToggle, onDelete, onUpdate, onSelect, isActive }) => {
    const [openInfo, setOpenInfo] = useState(false);

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
                    onChange={onToggle}
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

                    {/* --- ALTERAÇÃO AQUI --- */}
                    <Typography variant="body2" color="textSecondary">
                        {`Vence: ${formatDate(task.data_de_vencimento)} | Prioridade: ${task.prioridade}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {`Pomodoros: ${task.pomodoros_concluidos || 0}`}
                    </Typography>
                    
                </Box>
            </Box>

            <IconButton onClick={onSelect} title="Focar nesta tarefa">
                <PlayCircleOutlineIcon color={isActive ? 'primary' : 'inherit'} />
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