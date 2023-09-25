import reactLogo from './assets/react.svg';
import { Box, Container, Typography } from '@mui/material';
import './App.css';
import Metronome from './components/Metronome';
import TopBar from './components/TopBar';

function App() {

  return (
    <>
      <TopBar  />
      {/* <Box mt={-16}>
          <img src={reactLogo} className="logo react" alt="React logo" />
      </Box> */}
        <Typography variant='h1'>rudi</Typography>
        <Typography variant='body1' color='#8c8c8c'>drum rudiment metronome</Typography>
        <Metronome />
    </>
  );
}

export default App;
