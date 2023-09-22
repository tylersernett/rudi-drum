import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { Box, Slider, Typography, Button } from "@mui/material";
import * as Tone from 'tone';
import tickSound from "../assets/Synth_Sine_C_lo.wav";
import tickSoundDown from "../assets/Synth_Sine_C_hi.wav";
import Blinker from "./Blinker";
import SubdivisionCounter from "./SubdivisionCounter";

const Metronome = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [beat, setBeat] = useState(120);
  const [subdivisions, setSubdivisions] = useState(1);
  const sampler = useRef<Tone.Sampler | null>(null);
  const sequence = useRef<Tone.Sequence | null>(null);
  const [isBlinking, setIsBlinking] = useState(false);

  //put sequence in a ref, then cancel it? and use quantization @4n

  useEffect(() => {
    sampler.current = new Tone.Sampler({
      urls: {
        C3: tickSound,
        C4: tickSoundDown,
      },
      onload: () => {
        setLoaded(true);
        Tone.Transport.bpm.value = beat
      }
    }).toDestination();

    // restartSequence();
  }, [])

  const restartSequence = (restartTime = 0) => {
    const subDivNotes = Array.from({ length: subdivisions - 1 }, () => "C3");
    sequence.current = new Tone.Sequence((time, note) => {
      if (sampler.current) {
        sampler.current.triggerAttackRelease(note, "32n", time);
        // Tone.Draw.schedule(() => setIsBlinking(true), time); //this will blink EVERY subdivision
      }
    }, [["C4", ...subDivNotes]], "4n").start(restartTime);

    Tone.Transport.scheduleRepeat((time) => {
      Tone.Draw.schedule(() => setIsBlinking(true), time);
    }, "4n");
  }

  function start() {
    if (Tone.Transport.state !== "started") {

      restartSequence();

      Tone.Transport.start();
    }
  }

  function stop() {
    setIsBlinking(false);
    Tone.Transport.cancel(); //??? cancel vs stop vs dispose?
    Tone.Transport.stop();
  }

  const handleSliderChange = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    processSliderValue(newValue, setBeat);
  };
  const handleSliderCommit = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    processSliderValue(newValue, setBeat);
  };
  const processSliderValue = (value: number | number[], updateState: (value: number) => void) => {
    if (typeof value === 'number') {
      updateState(value);
      Tone.Transport.bpm.value = value
    } else {
      console.warn('Unexpected value:', value);
    }
  };

  useEffect(() => {
    const buttonElement = document.getElementById('starter');
    if (buttonElement) {
      const clickHandler = async () => {
        await Tone.start();
        console.log('audio is ready');
        console.log(Tone.getTransport())
      };
      buttonElement.addEventListener('click', clickHandler);

      return () => {
        buttonElement.removeEventListener('click', clickHandler);
      };
    }
  }, []);

  return (
    <div className="metronome">
      <SubdivisionCounter subdivisions={subdivisions} setSubdivisions={setSubdivisions} stop={stop} start={start} restartSequence={restartSequence} />
      <Blinker isBlinking={isBlinking} setIsBlinking={setIsBlinking} />
      <Slider
        min={20}
        max={256}
        value={beat}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderCommit}
      />
      <Box mt={1}>
        <Typography variant="body1">Beats per Minute (BPM): {beat}</Typography>
      </Box>
      <Box mt={2}>
        <Button variant='contained' id='starter' onClick={() => start()} disabled={!isLoaded}>Start</Button>
        <Button variant='contained' onClick={() => stop()}>Stop</Button>
      </Box>
    </div>
  );
};

export default Metronome;
