import { useEffect, Dispatch, SetStateAction, MutableRefObject } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import * as Tone from 'tone';
import Sequence from 'tone';
import { useMetronomeContext } from "../context/MetronomeContext";


interface SubdivisionCounterProps {
  restartSequence: (restartTime?: number) => void;
  // sequence: MutableRefObject<Sequence<any> | null>;
}

const SubdivisionCounter: React.FC<SubdivisionCounterProps> = ({ restartSequence, }) => {
  const { metronome, setMetronome } = useMetronomeContext();
  const { subdivisions } = metronome;
  const subMin = 1;
  const subMax = 8;
  const incrementSubdivisions = (val: number): void => {
    const newValue = Math.min(Math.max(subdivisions + val, subMin), subMax);
    setMetronome({ ...metronome, subdivisions: newValue });
  };

  // Use useEffect to listen for changes in subdivisions
  useEffect(() => {
    if (Tone.Transport.state === "started") {
      restartSequence();

      // const nextQuarterNoteTime = Tone.Transport.nextSubdivision('@4n');
      // console.log('Next quarter note time:', nextQuarterNoteTime);
      // restartSequence(Tone.now() + nextQuarterNoteTime);
    }
  }, [subdivisions]);

  return (
    <Box mt={3}>
      <Button variant="outlined" onClick={() => incrementSubdivisions(-1)} disabled={subdivisions === subMin}><RemoveIcon /></Button>
      <Button variant="outlined" onClick={() => incrementSubdivisions(1)} disabled={subdivisions === subMax}><AddIcon /></Button>
      <Typography variant="body1">
        subdivisions: {subdivisions}
      </Typography>
    </Box>
  );
};

export default SubdivisionCounter;