import { useNavigate } from 'react-router-dom';
import { Box,Container, TextField, Button, Typography, Paper } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const Login = () => {
  const navigate = useNavigate();

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

        <Paper elevation={3} sx={{ padding: 4, width: '100%'}}>
          <Button
            variant="outlined"
            startIcon={<KeyboardReturnIcon />}
            onClick={() => navigate('/')}
          >
            Retornar 
          </Button>
          <Typography component="h1" variant="h5" align="center" marginTop={5}>
            Login
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1, mb: 3 }}>
            Faça login para acessar o sistema
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuário"
              name="username"
              autoComplete="username"
              autoFocus

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
          
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color='primary'
            >
              Entrar
            </Button>
          </Box>
        </Paper>
    </Container>
    </Box>
  );
};

export default Login;
