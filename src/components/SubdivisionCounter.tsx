import { useEffect,  Dispatch, SetStateAction } from "react";
import { Box, Typography, Button } from "@mui/material";
import * as Tone from 'tone';

interface SubdivisionCounterProps {
  subdivisions: number;
  setSubdivisions: Dispatch<SetStateAction<number>>;
  stop: () => void;
  start: () => void;
  restartSequence: (restartTime: number) => void;
}

const SubdivisionCounter: React.FC<SubdivisionCounterProps> = ({ subdivisions, setSubdivisions, stop, start, restartSequence }) => {
  const subMin = 1;
  const subMax = 8;
  const incrementSubdivisions = (val: number): void => {
    const newValue = Math.min(Math.max(subdivisions + val, subMin), subMax);
    setSubdivisions(newValue);
  };

  // Use useEffect to listen for changes in subdivisions
  useEffect(() => {
    if (Tone.Transport.state === "started") {
      stop();
      start();
    }
  }, [subdivisions,]);

  return (
    <Box mt={2}>
      <Button variant="outlined" onClick={() => incrementSubdivisions(-1)} disabled={subdivisions === subMin}>–</Button>
      <Button variant="outlined" onClick={() => incrementSubdivisions(1)} disabled={subdivisions === subMax}>+</Button>
      <Typography variant="body1">
        subdivisions: {subdivisions}
      </Typography>
    </Box>
  );
};

export default SubdivisionCounter;