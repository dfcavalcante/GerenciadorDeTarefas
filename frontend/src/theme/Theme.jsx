import { createTheme } from '@mui/material/styles';

//se quiser trocar a cor do projeto inteiro é aq q faz
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // azul padrão
    },
    secondary: {
      main: '#9c27b0', // roxo padrão
    },
  },
  components: {
    MuiButtonBase: {

      styleOverrides: {
        root: {
          //remove o contorno
          '&:focus': {
            outline: 'none',       
            boxShadow: 'none',     
          },
        },
      },
    },
  },
});

export default theme;