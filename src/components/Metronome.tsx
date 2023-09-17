import { useState, useEffect, useMemo } from "react";
import { Box, Slider, Typography } from "@mui/material";
import * as Tone from 'tone';
import tickSound from "../assets/Synth_Sine_C_lo.wav";
import tickSoundDown from "../assets/Synth_Sine_C_hi.wav";

const BlinkingSquare = ({ isBlinking }) => {
  const squareStyle = {
    width: "50px",
    height: "50px",
    backgroundColor: isBlinking ? "gray" : "white",
    // transition: "background-color 0.2s ease-in-out",
  };

  return <div id='sq' style={squareStyle} />;
};

const Metronome = () => {
  const [beat, setBeat] = useState(120);
  const [isBlinking, setIsBlinking] = useState(false);
  // const playerDown = new Tone.Player(tickSoundDown).toDestination();

  // let repeat = Tone.Transport.scheduleRepeat((time) => {
  //   sampler.triggerAttackRelease("c4", "32n", time);
  // }, "4n");

  // const seq = new Tone.Sequence((time, note) => {
  //   sampler.triggerAttackRelease(note, "32n", time);
  // }, ["C4", "C3", "C3", "C3"], "16n").stop();

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

  // const synthA = new Tone.Synth().toDestination();

  // const loopA = new Tone.Loop(time => {
  //   // synthA.triggerAttackRelease("C2", "8n", time);
  //   player.start(time);
  // }, "16n").start(0);

  // const loopB = new Tone.Loop(time => {
  //   // synthA.triggerAttackRelease("C2", "8n", time);
  //   playerDown.start(time);
  // }, "4n").start(0);

  // const seq = new Tone.Sequence((time, note) => {
  //   sampler.triggerAttackRelease(note, "32n", time);
  //   // synthA.triggerAttackRelease(note, "32n", time);
  // }, ["C4", "C3", "C3", "C3"], "16n").start(0);
  // Tone.Transport.bpm.value = beat;


  // Tone.Transport.start();

  // Tone.Transport.schedule((time) => {
  //   // use the time argument to schedule a callback with Draw
  //   Tone.Draw.schedule(() => {
  //     // do drawing or DOM manipulation here
  //     console.log(time);
  //   }, time);
  // }, "1m");
  // Tone.Transport.start();
  // Tone.Transport.scheduleRepeat(time => {
  //   Tone.Draw.schedule(() => setIsBlinking(true), time);
  //   Tone.Draw.schedule(() => setIsBlinking(false), time + 1);
  // }, '4n');

  function start() {
    const seq = new Tone.Sequence((time, note) => {
      sampler.triggerAttackRelease(note, "32n", time);
    }, ["C4", "C3", "C3", "C3"], "16n").stop();

    Tone.Transport.scheduleRepeat((time) => {
      setIsBlinking(false);
      seq.start();
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

  const handleSliderChange = (event: Event, newValue: number) => {
    stop()
    setBeat(newValue);
    setTimeout(() => {
      Tone.Transport.bpm.setValueAtTime(newValue, Tone.Transport.now())
    }, 1000)
    start()
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
