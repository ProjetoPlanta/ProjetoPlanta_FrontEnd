import { createTheme } from '@mui/material/styles';

// Criando o tema personalizado
const theme = createTheme({
    typography: {
        fontFamily: 'News Cycle, Arial, sans-serif', // Aplica a fonte personalizada
        h4: {
            fontFamily: 'Qeilab, Arial, sans-serif',
            color: '#0F4C1A', // Pode definir a cor aqui direto
          },
      
      },
  palette: {
    primary: {
      main: '#0F4C1A', // Cor principal (verde escuro)
    },
    secondary: {
      main: '#E8DECD', // Cor secundária (bege)
    },
    background: {
      default: '#f4f4f4', // Cor de fundo padrão
    },
    error: {
        main: '#C23E2E',
    }
  },
  components: {
    /*MuiTypography: {
        styleOverrides: {
          root: {
            color: '#0F4C1A', // Define a cor padrão do texto
          },
        },
      },*/
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          borderRadius: 100, // Bordas arredondadas
          padding: '8px 24px',
        },
        contained: {
          
          color: '#fff', // Texto branco
          '&:hover': {
            backgroundColor: '#0D4116', // Cor ao passar o mouse
          },
        },
        outlined: {
          borderColor: '#0F4C1A', // Cor da borda
          color: '#0F4C1A', // Cor do texto
          '&:hover': {
            backgroundColor: 'rgba(15, 76, 26, 0.1)', // Fundo verde claro ao passar o mouse
          },
        },
      },
    },
  },
});

export default theme;
