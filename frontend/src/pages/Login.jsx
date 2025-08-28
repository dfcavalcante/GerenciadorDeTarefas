import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // ALTERAÇÃO: Importamos o Link
import { Box, Container, TextField, Button, Typography, Paper, Alert } from '@mui/material';

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/auth/login', {
                username: username,
                password: password
            });

            const token = response.data.access_token;
            localStorage.setItem('accessToken', token);

            alert('Login realizado com sucesso!');
            navigate('/'); // Redireciona para a página inicial após o login

        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.erro || 'Ocorreu um erro ao fazer login.');
            } else {
                setError('Não foi possível conectar ao servidor.');
            }
        }
    };

    return (
        <Box component="section" maxWidth="xs" sx={{
            backgroundColor: '#f0f2f5',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            <Container component="main" maxWidth="xs" sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
                    
                    <Typography component="h1" variant="h5" align="center" sx={{ mb: 1 }}>
                        Login
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                        Faça login para acessar o sistema
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="email"
                            name="username"
                            autoComplete="email"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {error}
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color='primary'
                        >
                            Entrar
                        </Button>

                        {/* ALTERAÇÃO: Adicionamos o link para a página de cadastro aqui */}
                        <Box textAlign="center">
                            <Typography variant="body2">
                                Não tem uma conta?{' '}
                                <Link to="/cadastro" style={{ color: 'inherit' }}>
                                    Cadastre-se
                                </Link>
                            </Typography>
                        </Box>

                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;