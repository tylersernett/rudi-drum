import { Dispatch, SetStateAction, useEffect } from "react";
import { Box, Typography, Slider, Grid } from "@mui/material";
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

  const handleSubdivisionsChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      const newSubdivisions = Math.min(Math.max(newValue, subMin), subMax);
      setMetronome({ ...metronome, subdivisions: newSubdivisions });
    }
  };

  // Update the size of isBlinking array when subdivisions change
  useEffect(() => {
    console.log(metronome)
    setIsBlinking(Array.from({ length: subdivisions }, () => false));
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
