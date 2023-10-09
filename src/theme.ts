import { createTheme } from "@mui/material";
import { orange, grey, purple, } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: purple.A200,
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
            // boxSizing: 'border-box',
            outline: '1px solid white', // Change the outline color to purple when focused
            // border: `1px solid ${purple.A200}`, // Change the outline color to purple when focused
            boxShadow: `inset 0px 0px 0px 2px ${purple.A200}`,
            transition: 'none'
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            // boxSizing: 'border-box',
            outline: '1px solid white', // Change the outline color to purple when focused
            boxShadow: `inset 0px 0px 0px 2px ${purple.A200}`,
            transition: 'none'
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: '1px solid white', // Change the outline color to purple when focused
            boxShadow: `inset 0px 0px 0px 2px ${purple.A200}`,
            transition: 'none'
          },
        },
      },
    },
  },
});