// import { useState, useEffect, useMemo, useRef } from "react";
// import * as Tone from 'tone';
import { Dispatch, SetStateAction, useState } from "react";
import { Box, Switch, Typography } from "@mui/material";

type Visibility = "visible" | "hidden";

interface BlinkingSquareProps {
  isBlinking: boolean;
  setIsBlinking: Dispatch<SetStateAction<boolean>>;
}

const Blinker: React.FC<BlinkingSquareProps> = ({ isBlinking, setIsBlinking }) => {
  const [blinkToggle, setBlinkToggle] = useState(true);

  const squareStyle = {
    width: "50px",
    height: "50px",
    backgroundColor: isBlinking ? "orange" : "lightgray",
    borderRadius: '100%',
    visibility: blinkToggle ? "visible" : "hidden" as Visibility, // Cast to Visibility
    // transition: "background-color 0.2s ease-in-out",
  };

  //BUG: seems to lose sync with 5 or 7 subdivision?

  if (isBlinking) {
    setTimeout(() => {
      setIsBlinking(false)
    }, 60);
    // Tone.Draw.schedule(() => setIsBlinking(false), Tone.now() +Tone.Time("32n").toSeconds());
  }
  const handleToggleChange = () => {
    setBlinkToggle((prevBlinkToggle) => !prevBlinkToggle);
  };


  return (
    <>
      <Switch
        checked={blinkToggle}
        onChange={handleToggleChange}
        color="primary"
      />
      <Typography>Blink: {blinkToggle ? 'On' : 'Off'}</Typography>
      <Box
        display="flex"
        justifyContent="center"
      // mt={2}
      >
        <div id='sq' style={squareStyle} />
      </Box>
    </>
  )
};

export default Blinker