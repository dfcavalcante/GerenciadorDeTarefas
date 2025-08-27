import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  
  return(
      <AppBar position="fixed"  sx={{
      height: 120,
      backgroundPosition: 'center',
    }}>

      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

        

        {/* Logo e título */}
        <Box sx={{ display: 'flex', alignItems: 'center', height: 200, px: 2 }}>
          
        <img
            src="images/pomodoro2.png"
            alt="Logo pomodoro"
            style={{ height: 100, width: 'auto', padding:'20px'}}
          />
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 'bold',
                userSelect: 'none',
                fontSize: '40px'
              }}
            >
              Pomodoro Timer
            </Typography>
          </Box>
        </Box>

        {/* Botões de navegação */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          <IconButton  onClick={() => navigate('/login')}>
              <AccountCircleIcon  sx = {{fontSize: '50px'}} />
          </IconButton>

          <IconButton

          >
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;