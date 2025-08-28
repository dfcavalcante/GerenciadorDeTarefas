// src/pages/Home.jsx

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
    const [activeTask, setActiveTask] = useState(null); // Estado para a tarefa ativa

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

    const handlePomodoroComplete = async () => {
        if (!activeTask) return;

        const token = localStorage.getItem('accessToken');
        const updatedPomodoros = (activeTask.pomodoros_concluidos || 0) + 1;

        try {
            await axios.put(`http://127.0.0.1:5000/api/tarefas/${activeTask.id}`,
                { pomodoros_concluidos: updatedPomodoros },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchTarefas();
            setActiveTask(null);
            alert(`Pomodoro para a tarefa "${activeTask.titulo}" concluído!`);
        } catch (err) {
            setError('Não foi possível registrar o pomodoro.');
        }
    };
    
    const handleAddTask = async (formData) => { /* ... sua função handleAddTask ... */ };
    const handleDeleteTask = async (id) => { /* ... sua função handleDeleteTask ... */ };
    const handleUpdateTask = async (id, taskData) => { /* ... sua função handleUpdateTask ... */ };
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };
    
    const productivityData = { /* ... seus dados fake ... */ };

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
                                onPomodoroComplete={handlePomodoroComplete} 
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