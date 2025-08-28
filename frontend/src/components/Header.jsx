import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem, ListItemIcon, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importamos a função para decodificar

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const open = Boolean(anchorEl);

  // Efeito que roda uma vez para pegar os dados do usuário do token
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // O backend precisa colocar o nome e email no token. 
        // A propriedade 'sub' é padrão para o identificador (geralmente email ou username)
        // Se o seu backend usa outros nomes (ex: 'user_name'), troque aqui.
        setUser({
          name: decodedToken.name || 'Usuário', // Tenta pegar o nome
          email: decodedToken.sub, // 'sub' (subject) é geralmente o email/username
        });
      } catch (error) {
        console.error("Token inválido:", error);
        handleLogout(); // Se o token for inválido, desloga o usuário
      }
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    handleClose();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <Toolbar sx={{ height: 80 }}> {/* Altura um pouco menor */}
        {/* Logo e título */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img
            src="/images/pomodoro2.png" // Caminho a partir da pasta public
            alt="Logo pomodoro"
            style={{ height: 50, width: 'auto', marginRight: '16px' }}
          />
          <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold', userSelect: 'none' }}>
            Pomodoro Timer
          </Typography>
        </Box>
        
        <Box sx={{ flexGrow: 1 }} /> {/* Espaçador */}

        {/* Ícone de Perfil */}
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
              Olá, {user.name}
            </Typography>
            <IconButton onClick={handleMenu} size="large">
              <AccountCircleIcon sx={{ fontSize: '32px' }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ 'aria-labelledby': 'basic-button' }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
                <Typography variant="body2" color="text.secondary">{user.email}</Typography>
              </Box>
              <Divider sx={{ my: 1 }}/>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Sair
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <IconButton onClick={() => navigate('/login')} size="large">
            <AccountCircleIcon sx={{ fontSize: '32px' }} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;