// src/components/Header.jsx

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importa a função da nova biblioteca

const Header = () => {
    const navigate = useNavigate();
    
    // Estado para guardar o nome do usuário
    const [username, setUsername] = useState(null);

    // useEffect para ler o token quando o componente carregar
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                // Decodifica o token para acessar o payload
                const decodedToken = jwtDecode(token);
                // Salva o nome do token no nosso estado
                setUsername(decodedToken.nome);
            } catch (error) {
                console.error("Token inválido:", error);
                // Se o token for inválido, podemos limpar e deslogar
                handleLogout();
            }
        }
    }, []); // O array vazio [] faz isso rodar apenas uma vez

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };
  
    return(
        <AppBar position="fixed" sx={{
            height: 120,
            backgroundPosition: 'center',
        }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                {/* Logo e título */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src="/images/pomodoro2.png" // Usar /images/ para caminho a partir da pasta public
                        alt="Logo pomodoro"
                        style={{ height: 100, width: 'auto', padding:'20px'}}
                    />
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{ fontWeight: 'bold', userSelect: 'none', fontSize: '40px' }}
                    >
                        Pomodoro Timer
                    </Typography>
                </Box>

                {/* Saudação e Botão de Logout */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography>
                        {/* Exibe o nome do usuário se ele existir, senão, não mostra nada */}
                        {username ? `Olá, ${username}` : ''}
                    </Typography>
                    
                    {/* O ícone agora é um botão de logout */}
                    <IconButton color="inherit" onClick={handleLogout} title="Sair">
                        <AccountCircleIcon sx={{ fontSize: '50px' }} />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;