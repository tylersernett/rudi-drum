import React, { useState, useEffect } from "react";
import { Box, Slider, Typography } from "@mui/material";
import * as Tone from 'tone';
import tickSound from "../assets/Synth_Sine_C_lo.wav";
import tickSoundDown from "../assets/Synth_Sine_C_hi.wav";


const Metronome = () => {
  const [beat, setBeat] = useState(120);
  const [isBlinking, setIsBlinking] = useState(false);
  // const player = new Tone.Player(tickSound).toDestination();
  // const playerDown = new Tone.Player(tickSoundDown).toDestination();

  // let repeat = Tone.Transport.scheduleRepeat((time) => {
  //   player.start(time).stop(time + 0.1);
  // }, "4n");

  const sampler = new Tone.Sampler({
    urls: {
      C3: tickSound,
      C4: tickSoundDown,
    },
    // baseUrl: "https://tonejs.github.io/audio/casio/",
    // onload: () => {
    //   sampler.triggerAttackRelease(["C1", "E1", "G1", "B1"], 0.5);
    // }
  }).toDestination();
  const synthA = new Tone.Synth().toDestination();

  // const loopA = new Tone.Loop(time => {
  //   // synthA.triggerAttackRelease("C2", "8n", time);
  //   player.start(time);
  // }, "16n").start(0);

  // const loopB = new Tone.Loop(time => {
  //   // synthA.triggerAttackRelease("C2", "8n", time);
  //   playerDown.start(time);
  // }, "4n").start(0);

  const seq = new Tone.Sequence((time, note) => {
    sampler.triggerAttackRelease(note, "32n", time);
    // synthA.triggerAttackRelease(note, "32n", time);
  }, ["C4", "C3", "C3", "C3"], "16n").start(0);
  Tone.Transport.bpm.value = beat;
  Tone.Transport.start();

  function start() {
    Tone.Transport.start();
  }
  function stop() {
    Tone.Transport.stop();
  }

  // setIsBlinking(true);
  // setTimeout(() => {
  //   setIsBlinking(false);
  // }, 100); // Adjust this value to control the blink duration

  const squareStyle = {
    width: "50px",
    height: "50px",
    backgroundColor: "gray",
    transition: "background-color 0.2s ease-in-out",
  };

  const blinkStyle = {
    backgroundColor: "white",
  };

  const handleSliderChange = (event: Event, newValue: number) => {
    // stop()
    // loopA.cancel()
    // loopB.cancel()
    Tone.Transport.cancel();
    // Tone.Transport.stop()
    // Tone.Transport.dispose()
    // new Tone.Transport
    // repeat = undefined;
    setBeat(newValue);
    setTimeout(() => {
      Tone.Transport.bpm.setValueAtTime(newValue, Tone.Transport.now())
    }, 1000)
  };

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


  return (
    <div className="metronome">
      <div style={{ ...squareStyle, ...(isBlinking ? blinkStyle : {}) }} />
      <Slider
        min={60}
        max={256}
        value={beat}
        onChange={handleSliderChange}
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
