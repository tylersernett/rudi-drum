// import { useState, useEffect, useMemo, useRef } from "react";
// import * as Tone from 'tone';
import { Dispatch, SetStateAction, } from "react";
import { Box, Switch, Typography } from "@mui/material";
import { useMetronomeContext } from "../context/MetronomeContext";

type Visibility = "visible" | "hidden";

interface BlinkingSquareProps {
  isBlinking: boolean;
  // setIsBlinking: Dispatch<SetStateAction<boolean>>;
  setIsBlinking: (newIsBlinking: boolean) => void;
}

const Blinker: React.FC<BlinkingSquareProps> = ({ isBlinking, setIsBlinking }) => {
  const { metronome, setMetronome } = useMetronomeContext();
  const { blinkToggle } = metronome;

  const squareStyle = {
    width: "50px",
    height: "50px",
    backgroundColor: isBlinking ? "orange" : "lightgray",
    borderRadius: '100%',
    visibility: blinkToggle ? "visible" : "hidden" as Visibility, // Cast to Visibility
    // transition: "background-color 0.2s ease-in-out",
  };

  if (isBlinking) {
    setTimeout(() => {
      setIsBlinking(false)
    }, 60);
  }
  
  const handleToggleChange = () => {
    setMetronome({ ...metronome, blinkToggle: !metronome.blinkToggle });
  };


  return (
    <>
      {/* <Box display='flex' justifyContent="center" alignItems='center'>
        <Typography>Blink</Typography>
        <Switch
          checked={blinkToggle}
          onChange={handleToggleChange}
          color="primary"
        />
        <Typography sx={{ minWidth: '4ch' }}>{blinkToggle ? 'On' : 'Off'}</Typography>
      </Box> */}

      {/* <Box
        display="flex"
        justifyContent="center"
      > */}
        <div id='sq' style={squareStyle} />
      {/* </Box> */}
    </>
  )
};

export default Blinker