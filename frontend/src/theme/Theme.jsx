import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Um azul mais moderno e vibrante
    },
    secondary: {
      main: '#4f46e5', // Um roxo/índigo complementar
    },
    background: {
      default: '#f8fafc', // Fundo da página em um tom de cinza muito claro
      paper: '#ffffff',   // Fundo dos "cards" e "papers" em branco puro
    },
    text: {
      primary: '#1e293b', // Texto principal um pouco mais suave que preto
      secondary: '#64748b', // Texto secundário
    }
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8, // Bordas levemente mais arredondadas
  },
  components: {
    // Estilizando o Header (AppBar) para ser branco
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2563eb',
          color: '#1e293b',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', // Sombra bem sutil
        },
      },
    },
    // Estilizando os botões
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Remove o CAPS LOCK dos botões
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    // Estilizando os "cards"
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)', // Sombra sutil padrão
        }
      }
    }
  },
});

export default theme;