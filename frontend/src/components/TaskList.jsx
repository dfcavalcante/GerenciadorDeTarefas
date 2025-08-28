import React, { useState, useEffect, useCallback } from 'react';
import TaskItem from './TaskItem';
import TaskAdd from './TaskAdd';
import { Box, Typography, Button, IconButton, Paper, Stack, Popper, CircularProgress, Alert } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TaskList() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false); // Para o modal TaskAdd
    const [anchorEl, setAnchorEl] = React.useState(null);

    const fetchTasks = useCallback(async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            // Não precisa mais de setLoading(true) aqui, o estado inicial já é true
            const response = await axios.get('http://127.0.0.1:5000/api/tarefas', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(response.data);
        } catch (err) {
            setError('Falha ao carregar tarefas.');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const openAnchor = Boolean(anchorEl);
    const id = openAnchor ? 'simple-popper' : undefined;

    // --- FUNÇÕES DE MANIPULAÇÃO COMPLETAS ---

    const handleAddTask = async (formData) => {
        const token = localStorage.getItem('accessToken');
        const newTask = {
            titulo: formData.title,
            prioridade: formData.priority.toLowerCase(),
            data_de_vencimento: formData.date,
            tempo_pomodoro_minutos: 25 // Valor padrão
        };
        try {
            await axios.post('http://127.0.0.1:5000/api/tarefas', newTask, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks(); // Re-busca as tarefas para atualizar a lista
        } catch (err) {
            setError('Falha ao adicionar tarefa.');
        }
    };

    const handleDeleteTask = async (id) => {
        const token = localStorage.getItem('accessToken');
        if (window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
            try {
                await axios.delete(`http://127.0.0.1:5000/api/tarefas/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchTasks(); // Re-busca as tarefas
            } catch (err) {
                setError('Falha ao deletar tarefa.');
            }
        }
    };

    const handleUpdateTask = async (id, formData) => {
        const token = localStorage.getItem('accessToken');
        const updatedData = {
            titulo: formData.title,
            prioridade: formData.priority.toLowerCase(),
            data_de_vencimento: formData.date
        };
        try {
            await axios.put(`http://127.0.0.1:5000/api/tarefas/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks(); // Re-busca as tarefas
        } catch (err) {
            setError('Falha ao editar tarefa.');
        }
    };

    const handleToggleTask = async (task) => {
        const token = localStorage.getItem('accessToken');
        const novoStatus = task.status === 'concluida' ? 'pendente' : 'concluida';
        try {
            await axios.put(`http://127.0.0.1:5000/api/tarefas/${task.id}`,
                { status: novoStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchTasks(); // Re-busca as tarefas
        } catch (err) {
            setError('Falha ao atualizar tarefa.');
        }
    };


    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

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
                        <Button sx={{ justifyContent: 'flex-start' }}>
                            <DeleteIcon />
                            <Typography variant='body2'>Excluir todas as tarefas </Typography>
                        </Button>
                        <Button sx={{ justifyContent: 'flex-start' }}>
                            <ClearIcon />
                            <Typography variant='body2'>Excluir tarefas concluidas </Typography>
                        </Button>
                        <Button sx={{ justifyContent: 'flex-start' }}>
                            <VisibilityOffIcon />
                            <Typography variant='body2'>Esconder tarefas concluidas </Typography>
                        </Button>
                    </Stack>
                </Paper>
            </Popper>

            <Button
                fullWidth
                onClick={() => setOpen(true)}
                sx={{
                    display: 'flex', alignItems: 'center', p: 1.5, mb: 1.5,
                    borderRadius: 2, border: '1px dashed #aaa', textTransform: 'none',
                    '&:hover': { backgroundColor: '#f5f5f5' }
                }}
            >
                <AddCircleIcon sx={{ paddingRight: '6px' }} />
                Adicionar Task
            </Button>

            <TaskAdd open={open} onClose={() => setOpen(false)} onSave={handleAddTask} />

            <Box>
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={() => handleToggleTask(task)}
                        onDelete={handleDeleteTask}
                        onUpdate={handleUpdateTask}
                    />
                ))}
            </Box>
        </Box>
    );
}

export default TaskList;