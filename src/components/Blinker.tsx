// import { useState, useEffect, useMemo, useRef } from "react";
import * as Tone from 'tone';

interface BlinkingSquareProps {
  isBlinking: boolean;
  setIsBlinking: (isBlinking: boolean) => void;
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
    // Tone.Draw.schedule(() => setIsBlinking(false), Tone.now() +Tone.Time("32n").toSeconds());
    Tone.Draw.schedule(() => setIsBlinking(false), Tone.now());
  }

  return <div id='sq' style={squareStyle} />;
};

export default Blinker