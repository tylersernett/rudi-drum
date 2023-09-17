import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { Box, Typography } from "@mui/material";

const Metronome = () => {
  const [beat, setBeat] = useState(1);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    let intervalId;

    const startBlinking = () => {
      intervalId = setInterval(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
        }, 100); // Adjust this value to control the blink duration
      }, (60 / beat) * 1000); // Calculate the interval based on the BPM
    };

    startBlinking();

    return () => {
      clearInterval(intervalId);
    };
  }, [beat]);

  const handleSliderChange = (event, newValue) => {
    setBeat(newValue);
  };

  const squareStyle = {
    width: "50px",
    height: "50px",
    backgroundColor: "gray",
    transition: "background-color 0.2s ease-in-out",
  };

  const blinkStyle = {
    backgroundColor: "white",
  };

  return (
    <div className="metronome">
      <div style={{ ...squareStyle, ...(isBlinking ? blinkStyle : {}) }} />
      <Slider
        min={1}
        max={300}
        value={beat}
        onChange={handleSliderChange}
      />
      <Box mt={2}>
        <Typography variant="body2">Beats per Minute (BPM): {beat}</Typography>
      </Box>
    </div>
  );
};

export default Metronome;
