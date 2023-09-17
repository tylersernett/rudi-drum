import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Metronome from './components/Metronome';
import Toney from './components/Toney';

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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>


      <h1>Rudi</h1>
      <div className="card">
        <div onClick={() => setCountL((count) => count + 1)}>
          Left: {countL}
        </div>
        <div onClick={() => setCountR((count) => count + 1)}>
          Right: {countR}
        </div>
        <Metronome />
        {/* <Toney/> */}
      </div>
    </>
  );
}

export default App;
