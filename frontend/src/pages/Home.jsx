import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TaskList from '../components/TaskList';
import PomodoroTimer from '../components/PomodoroTimer';
import ProductivityChart from '../components/ProductivityChart';
import { Box, Container, CircularProgress, Alert } from '@mui/material';

const Home = () => {
    const navigate = useNavigate();
    const [tarefas, setTarefas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTask, setActiveTask] = useState(null);

    const fetchTarefas = useCallback(async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.get('http://127.0.0.1:5000/api/tarefas', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTarefas(response.data);
        } catch (err) {
            setError('Não foi possível carregar as tarefas.');
            if (err.response && err.response.status === 401) {
                localStorage.removeItem('accessToken');
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchTarefas();
    }, [fetchTarefas]);

    const handleAddTask = async (formData) => {
        const token = localStorage.getItem('accessToken');
        const newTask = {
            titulo: formData.title,
            prioridade: formData.priority.toLowerCase(),
            data_de_vencimento: formData.date,
            tempo_pomodoro_minutos: 25
        };
        try {
            await axios.post('http://127.0.0.1:5000/api/tarefas', newTask, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTarefas();
        } catch (err) {
            setError('Falha ao adicionar tarefa.');
        }
    };

    const handleDeleteTask = async (id) => {
        const token = localStorage.getItem('accessToken');
        try {
            await axios.delete(`http://127.0.0.1:5000/api/tarefas/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTarefas();
        } catch (err) {
            setError('Falha ao deletar tarefa.');
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
            fetchTarefas();
        } catch (err) {
            setError('Falha ao editar tarefa.');
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };
    
    const productivityData = {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
        datasets: [{
            label: 'Horas Focadas', data: [6, 7.5, 5, 8, 7],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
    };

    if (loading) return <Container sx={{ display: 'flex', justifyContent: 'center', mt: '20%' }}><CircularProgress /></Container>;
    if (error) return <Container sx={{ mt: '20%' }}><Alert severity="error">{error}</Alert></Container>;

    return (
        <div className='body-home'>
            <div className="app-container">
                <Header onLogout={handleLogout} />
                <Container sx={{ mt: '150px' }}>
                    <Box className="main-content">
                        <TaskList
                            tarefas={tarefas}
                            onAddTask={handleAddTask}
                            onDeleteTask={handleDeleteTask}
                            onUpdateTask={handleUpdateTask}
                            onSelectTask={setActiveTask}
                            activeTaskId={activeTask ? activeTask.id : null}
                        />
                        <Box className="right-panel">
                            <PomodoroTimer 
                                activeTask={activeTask}
                            />
                            <Box sx={{ mt: 4 }}>
                                <ProductivityChart data={productivityData} />
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </div>
        </div>
    );
};

export default Home;