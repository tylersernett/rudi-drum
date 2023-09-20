import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { orange, grey} from '@mui/material/colors';
import CssBaseline from "@mui/material/CssBaseline";


const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    mode: 'dark',
    background: {
      default: grey[900]
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
