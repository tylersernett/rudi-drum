import { Dispatch, SetStateAction, useEffect, } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import * as Tone from 'tone';
import { useMetronomeContext } from "../context/MetronomeContext";

interface SubdivisionCounterProps {
  restartSequence: (restartTime?: number) => void;
  setIsBlinking: Dispatch<SetStateAction<boolean[]>>;
}

const SubdivisionCounter: React.FC<SubdivisionCounterProps> = ({ restartSequence, setIsBlinking }) => {
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
    console.log(metronome)
    setIsBlinking((prevIsBlinking) => {
      console.log('prev: ', prevIsBlinking)
      // Update the size of isBlinking array when subdivisions change
      const newIsBlinking = [...prevIsBlinking].slice(0, subdivisions);
      while (newIsBlinking.length < subdivisions) {
        newIsBlinking.push(false);
      }
      console.log('new: ', newIsBlinking)
      return newIsBlinking;
    });
    if (Tone.Transport.state === "started") {

      restartSequence();
    }
  }, [subdivisions, setIsBlinking,]);

  return (
    <Box mt={1} display='flex' alignItems='center' sx={{ width: '320px', margin: 'auto' }}>
      <Typography variant="body1" mr={1} sx={{ width: '50px', flexShrink: 0 }}>Subs</Typography>
      <Slider
        value={subdivisions}
        min={subMin}
        max={subMax}
        step={1}
        sx={{ width: '220px' }}
        onChange={handleSubdivisionsChange}
        marks
      />
      <Typography variant="body1" ml={1} sx={{ width: '50px', flexShrink: 0, minWidth: '3ch' }}>{subdivisions}</Typography>
    </Box>

  );
};

export default SubdivisionCounter;
