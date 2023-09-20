import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Metronome from './components/Metronome';
import Toney from './components/Toney';
import { Box, Typography } from '@mui/material';

function App() {
  const [countL, setCountL] = useState(0);
  const [countR, setCountR] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F' || event.key === 'f') {
        setCountL((prevCount) => prevCount + 1);
      } else if (event.key === 'J' || event.key === 'j') {
        setCountR((prevCount) => prevCount + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* <Box mt={-3}>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </Box> */}

      <Typography mb={-2} variant='h1'>rudi</Typography>
      <div className="card">
        <span onClick={() => setCountL((count) => count + 1)}>
          Left: {countL}
        </span>&nbsp;|&nbsp;
        <span onClick={() => setCountR((count) => count + 1)}>
          Right: {countR}
        </span>
        <Metronome />
      </div>
    </>
  );
}

export default App;
