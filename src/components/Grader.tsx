import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import * as Tone from 'tone';


const Grader = () => {
  const [countL, setCountL] = useState(0);
  const [countR, setCountR] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F' || event.key === 'f') {
        setCountL((prevCount) => prevCount + 1);
        calculateGrade();
      } else if (event.key === 'J' || event.key === 'j') {
        setCountR((prevCount) => prevCount + 1);
        calculateGrade();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const calculateGrade = () => {
    const nextQuarterNoteTime = Tone.Transport.nextSubdivision("4n")
    const immediateTime = Tone.immediate()
    const timeToNextQuarter = nextQuarterNoteTime - immediateTime;
    console.log('now to next 4n: ', timeToNextQuarter)
    const quarterNoteLength = Tone.Transport.toSeconds("4n");
    const lookAhead = 0.0;
    console.log('score: ', quarterNoteLength - timeToNextQuarter - lookAhead, " | ", (timeToNextQuarter + lookAhead) / quarterNoteLength)
  }

  return (
    <Box>
      <span onClick={() => setCountL((count) => count + 1)}>
        Left: {countL}
      </span>&nbsp;|&nbsp;
      <span onClick={() => setCountR((count) => count + 1)}>
        Right: {countR}
      </span>
    </Box>
  )
}

export default Grader