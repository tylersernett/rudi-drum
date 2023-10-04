// import reactLogo from './assets/react.svg';
import { Typography } from '@mui/material';
import './App.css';
import Metronome from './components/Metronome';
import TopBar from './components/TopBar';
import { useEffect } from 'react';
import { useUserContext } from './context/UserContext';
import { toNewUser } from './utils';

function App() {
  const { setUser } = useUserContext();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedRudiUser')
    if (loggedUserJSON) {
      console.log('logged user found!', loggedUserJSON)
      const obj: unknown = JSON.parse(loggedUserJSON)
      const user = toNewUser(obj)
      setUser(user)
    }
  }, [])

  return (
    <>
      <TopBar />
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
