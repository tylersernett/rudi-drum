// import { useState, useEffect, useMemo, useRef } from "react";
// import * as Tone from 'tone';
import { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";

interface BlinkingSquareProps {
  isBlinking: boolean;
  setIsBlinking: Dispatch<SetStateAction<boolean>>;
}

const Blinker: React.FC<BlinkingSquareProps> = ({ isBlinking, setIsBlinking }) => {
  const squareStyle = {
    width: "50px",
    height: "50px",
    backgroundColor: isBlinking ? "orange" : "lightgray",
    borderRadius: '100%',
    // transition: "background-color 0.2s ease-in-out",
  };

  if (isBlinking) {
    setTimeout(() => {
      setIsBlinking(false)
    }, 60);
    // Tone.Draw.schedule(() => setIsBlinking(false), Tone.now() +Tone.Time("32n").toSeconds());
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
    >
      <div id='sq' style={squareStyle} />
    </Box>
  )
};

export default Blinker