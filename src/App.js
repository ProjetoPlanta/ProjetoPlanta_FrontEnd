import './App.css';
import AppRoutes from './Utils/Routes';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Utils/theme';
function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      
      <AppRoutes />
      
    </div>
    </ThemeProvider>
  );
}

export default App;
