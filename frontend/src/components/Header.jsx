// src/components/Header.jsx

import React, { useState, useEffect } from 'react';
// NOVO: Adicionamos Menu e MenuItem
import { AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);

    // --- LÓGICA DO MENU ---
    // Estado para controlar onde o menu vai aparecer
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    // Função para abrir o menu na posição do ícone
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Função para fechar o menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    // --- FIM DA LÓGICA DO MENU ---

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUsername(decodedToken.nome); // Usando o campo 'nome' que definimos
            } catch (error) {
                console.error("Token inválido:", error);
                handleLogout(); // Se o token for inválido, desloga
            }
        }
    }, []);

    const handleLogout = () => {
        handleMenuClose(); // Fecha o menu antes de deslogar
        localStorage.removeItem('accessToken');
        navigate('/login');
    };
  
    return(
        <AppBar position="fixed" sx={{ /* ... seus estilos ... */ }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                {/* Logo e título */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* ... seu código do logo e título ... */}
                    <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', userSelect: 'none', fontSize: '40px' }}>
                        Pomodoro Timer
                    </Typography>
                </Box>

                {/* Saudação e Ícone do Usuário */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography>
                        {username ? `Olá, ${username}` : ''}
                    </Typography>
                    
                    {/* ALTERADO: O ícone agora abre o menu */}
                    <IconButton
                        color="inherit"
                        onClick={handleMenuOpen} // Chama a função para abrir o menu
                        title="Opções do Usuário"
                    >
                        <AccountCircleIcon sx={{ fontSize: '50px' }} />
                    </IconButton>

                    {/* --- COMPONENTE DO MENU --- */}
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