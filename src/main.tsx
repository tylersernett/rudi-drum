import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from './theme.ts';
import { UserProvider } from './context/UserContext.tsx';
import { MetronomeProvider } from './context/MetronomeContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
    <MetronomeProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
      </MetronomeProvider>
    </UserProvider>
  </React.StrictMode>,
)
