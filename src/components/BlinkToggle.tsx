import React from "react";
import { ButtonGroup, Button, ToggleButton, ToggleButtonGroup, Typography, Box } from "@mui/material";
import { IMetronome, BlinkToggleOption } from "../types"; // Import your types
import { useMetronomeContext } from "../context/MetronomeContext";

interface BlinkToggleProps {
  // blinkToggle: BlinkToggleOption;
  // setBlinkToggle: (value: BlinkToggleOption) => void;
}

const BlinkToggle: React.FC<BlinkToggleProps> = () => {
  const { metronome, setMetronome } = useMetronomeContext();
  const { blinkToggle, subdivisions } = metronome;
  const handleToggleChange = (event: React.MouseEvent<HTMLElement>, value: BlinkToggleOption) => {
    if (value !== null) {
      setMetronome({ ...metronome, blinkToggle: value });
    }
  };

  return (
    <Box mb={2}>
      <Typography mb={0.5} variant='body2' >Blink</Typography>
      <ToggleButtonGroup
        value={blinkToggle}
        exclusive
        onChange={handleToggleChange}
        aria-label="Blink Toggle"
        fullWidth
        color='primary'
      >
        <ToggleButton value={BlinkToggleOption.Off} aria-label="Off">
          Off
        </ToggleButton>
        <ToggleButton value={BlinkToggleOption.Downbeat} aria-label="Downbeat">
          Downbeat
        </ToggleButton>
        <ToggleButton value={BlinkToggleOption.All} aria-label="All" disabled={subdivisions<=1}>
          All
        </ToggleButton>
        {/* <ToggleButton value={BlinkToggleOption.MonoAll} aria-label="MonoAll">
          MonoAll
        </ToggleButton> */}
      </ToggleButtonGroup>
    </Box>
  );
};

export default BlinkToggle;
