import { useState, useEffect, useMemo } from "react";
import { Box, Slider, Typography } from "@mui/material";
import * as Tone from 'tone';
import tickSound from "../assets/Synth_Sine_C_lo.wav";
import tickSoundDown from "../assets/Synth_Sine_C_hi.wav";

interface BlinkingSquareProps {
  isBlinking: boolean;
}

const BlinkingSquare: React.FC<BlinkingSquareProps> = ({ isBlinking }) => {  
  const squareStyle = {
    width: "50px",
    height: "50px",
    backgroundColor: isBlinking ? "lightgray" : "orange",
    borderRadius: '100%'
    // transition: "background-color 0.2s ease-in-out",
  };

  return <div id='sq' style={squareStyle} />;
};

const Metronome = () => {
  const [beat, setBeat] = useState(120);
  const [isBlinking, setIsBlinking] = useState(false);

  // useEffect( () => {
  //   // Create audio components and set up scheduling only once
  //   const sampler = new Tone.Sampler({
  //     urls: {
  //       C3: tickSound,
  //       C4: tickSoundDown,
  //     },
  //     onload: () => {
  //       // sampler.triggerAttackRelease("C6", "32n", 0);
  //       // Tone.Transport.scheduleRepeat((time) => {
  //       //   setIsBlinking(false);
  //       //   sampler.triggerAttackRelease("C4", "32n", time);
  //       //   Tone.Draw.schedule(() => setIsBlinking(true), time);
  //       // }, "4n");
  //       // new Tone.Sequence((time, note) => {
  //       //   sampler.triggerAttackRelease(note, "32n", time);
  //       // }, ["C4", "C3", "C3", "C3"], "16n").start(0);
  //     }
  //   }).toDestination();

  //   Tone.Transport.bpm.value = beat;

  //   // Tone.Transport.scheduleRepeat((time) => {
  //   //   setIsBlinking(false);
  //   //   sampler.triggerAttackRelease("C5", "32n", time);
  //   //   Tone.Draw.schedule(() => setIsBlinking(true), time);
  //   // }, "4n");

  //   return () => {
  //     // Clean up audio components if needed
  //     sampler.dispose();
  //   };
  // }, [beat]);

  const sampler = new Tone.Sampler({
    urls: {
      C3: tickSound,
      C4: tickSoundDown,
    },
  }).toDestination();

  async function start() {
    const seq = await new Tone.Sequence((time, note) => {
      sampler.triggerAttackRelease(note, "32n", time);
    }, ["C4", "C3", "C3", "C3"], "16n").stop();

    seq.start();
    Tone.Transport.scheduleRepeat((time) => {
      setIsBlinking(false);
      // sampler.triggerAttackRelease("C4", "16n", time);
      Tone.Draw.schedule(() => setIsBlinking(true), time);
    }, "4n");

    Tone.Transport.start();
  }

  function stop() {
    Tone.Transport.cancel();
    // seq.cancel();
    // seq.stop();
    // seq.dispose();
    Tone.Transport.stop();
  }

  const handleSliderChange = (newValue: number) => {
    setBeat(newValue);
  };

  const handleSliderCommit = (newValue: number) => {
    stop()
    setTimeout(() => {
      Tone.Transport.bpm.setValueAtTime(newValue, Tone.Transport.immediate())
    }, 100)
    start()
  }

  useEffect(() => {
    const buttonElement = document.querySelector('button');
    if (buttonElement) {
      const clickHandler = async () => {
        await Tone.start();
        console.log('audio is ready');
      };
      buttonElement.addEventListener('click', clickHandler);

      return () => {
        buttonElement.removeEventListener('click', clickHandler);
      };
    }
  }, []);

  const blinkingSquare = useMemo(() => <BlinkingSquare isBlinking={isBlinking} />, [isBlinking]);

  return (
    <div className="metronome">
      {/* <div id='sq' style={{ ...squareStyle, ...(isBlinking ? blinkStyle : {}) }} /> */}
      {blinkingSquare}
      <Slider
        min={60}
        max={256}
        value={beat}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderCommit}
      />
      <Box mt={2}>
        <Typography variant="body2">Beats per Minute (BPM): {beat}</Typography>
      </Box>
      <button onClick={() => start()}>Start</button>
      <button onClick={() => stop()}>Stop</button>
    </div>
  );
};

export default Metronome;
