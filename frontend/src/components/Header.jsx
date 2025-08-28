// src/components/Header.jsx

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUsername(decodedToken.nome);
            } catch (error) {
                console.error("Token inválido:", error);
                handleLogout();
            }
        }
    }, []);

    const handleLogout = () => {
        handleMenuClose();
        localStorage.removeItem('accessToken');
        navigate('/login');
    };
  
    return(
        <AppBar position="fixed" sx={{ height: 120, backgroundPosition: 'center' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                
                {/* Logo e título */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    
                    {/* --- A LINHA FALTANTE ESTÁ AQUI --- */}
                    <img
                        src="/images/pomodoro2.png"
                        alt="Logo pomodoro"
                        style={{ height: 100, width: 'auto', padding: '20px' }}
                    />
                    
                    <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', userSelect: 'none', fontSize: '40px' }}>
                        Pomodoro Timer
                    </Typography>
                </Box>

                {/* Saudação e Ícone do Usuário */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography>
                        {username ? `Olá, ${username}` : ''}
                    </Typography>
                    
                    <IconButton
                        color="inherit"
                        onClick={handleMenuOpen}
                        title="Opções do Usuário"
                    >
                        <AccountCircleIcon sx={{ fontSize: '50px' }} />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>Meu Perfil</MenuItem>
                        <MenuItem onClick={handleLogout}>Sair</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;