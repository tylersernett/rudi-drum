import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Metronome from './components/Metronome';
import { Box, Typography } from '@mui/material';
import * as Tone from 'tone';

function App() {

  return (
    <>
      <Box mt={-8}>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </Box>

      <Typography variant='h1'>rudi</Typography>
      <Metronome />
    </>
  );
}

export default App;
