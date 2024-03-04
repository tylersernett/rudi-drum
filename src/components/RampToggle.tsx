import React from "react";
import { ToggleButton, ToggleButtonGroup, Typography, Box } from "@mui/material";
import { RampToggleOption } from "../types"; // Import your types
import { useMetronomeContext } from "../context/MetronomeContext";

interface RampToggleProps {
  // rampToggle: RampToggleOption;
  // setRampToggle: (value: RampToggleOption) => void;
}

const RampToggle: React.FC<RampToggleProps> = () => {
  const { metronome, setMetronome } = useMetronomeContext();
  const { rampToggle } = metronome;
  const handleToggleChange = (_event: React.MouseEvent<HTMLElement>, value: RampToggleOption) => {
    if (value !== null) {
      setMetronome({ ...metronome, rampToggle: value });
    }
  };

  return (
    <Box mb={2}>
      <Typography mb={0.5} variant='body2' >Ramp</Typography>
      <ToggleButtonGroup
        value={rampToggle}
        exclusive
        onChange={handleToggleChange}
        aria-label="Ramp Toggle"
        fullWidth
        color='primary'
      >
        <ToggleButton value={RampToggleOption.Off} aria-label="Off">
          Off
        </ToggleButton>
        <ToggleButton value={RampToggleOption.On} aria-label="On">
          On
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default RampToggle;
