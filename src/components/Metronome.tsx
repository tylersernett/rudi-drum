import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { Box, Typography } from "@mui/material";
import tickSound from '../assets/Synth_Sine_C_lo.wav';

const Metronome = () => {
  const [beat, setBeat] = useState(120);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSoundReady, setIsSoundReady] = useState(false); // New state to track audio readiness

  useEffect(() => {
    let intervalId;

    const startBlinking = () => {
      intervalId = setInterval(() => {
        setIsBlinking(true);
        if (isSoundReady) {
          // audioRef.current.play(); // Play the sound when it's ready
          const audio1 = document.getElementById("click");
          audio1.play();
        }
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

  const audioRef = React.createRef(); // Create a reference to the audio element
  const handleAudioReady = () => {
    setIsSoundReady(true); // Set the audio readiness flag when it's ready
  };
  return (
    <div className="metronome">
      <div style={{ ...squareStyle, ...(isBlinking ? blinkStyle : {}) }} />
      <Slider
        min={60}
        max={200}
        value={beat}
        onChange={handleSliderChange}
      />
      <Box mt={2}>
        <Typography variant="body2">Beats per Minute (BPM): {beat}</Typography>
      </Box>
      <audio id={'click'} ref={audioRef} src={tickSound} preload="auto" onCanPlay={handleAudioReady} />
    </div>
  );
};

export default Metronome;
