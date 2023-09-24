import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { orange, grey, purple, } from '@mui/material/colors';
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: '1px solid white', // Change the outline color to purple when focused
            border: `1px solid ${purple.A200}`, // Change the outline color to purple when focused
            boxShadow: `inset 0px 0px 0px 1px ${purple.A200}`,
            transition: 'none'

          },
        },
      },
    },
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
