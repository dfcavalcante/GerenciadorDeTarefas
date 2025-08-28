// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import TaskList from '../components/TaskList';
import PomodoroTimer from '../components/PomodoroTimer';
import ProductivityChart from '../components/ProductivityChart';
import { Box, Container, CircularProgress, Alert, Button } from '@mui/material';

const Home = () => {
    const navigate = useNavigate();

    // --- LÓGICA DE DADOS ADICIONADA ---
    const [tarefas, setTarefas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTarefas = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
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
        };

        fetchTarefas();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };
    
    // --- Dados fake do gráfico (pode ser mantido por enquanto) ---
    const productivityData = {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
        datasets: [{
            label: 'Horas Focadas',
            data: [6, 7.5, 5, 8, 7],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
    };

    // --- RENDERIZAÇÃO CONDICIONAL ---
    if (loading) {
        return <Container sx={{ display: 'flex', justifyContent: 'center', mt: '20%' }}><CircularProgress /></Container>;
    }

    if (error) {
        return <Container sx={{ mt: '20%' }}><Alert severity="error">{error}</Alert></Container>;
    }

    // --- CONTEÚDO PRINCIPAL ---
    return (
        <div className='body-home'>
            <div className="app-container">
                <Header onLogout={handleLogout} /> {/* Passando a função de logout para o Header */}
                <Container sx={{ mt: '150px' }}>
                    <Box className="main-content">
                        {/* Lado Esquerdo: Passando as tarefas para o TaskList */}
                        <TaskList tarefas={tarefas} />

                        {/* Lado Direito */}
                        <Box className="right-panel">
                            <PomodoroTimer />
                            <Box sx={{ mt: 4 }}>
                                <ProductivityChart data={productivityData} />
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </div>
        </div>
    );
}

export default Home;