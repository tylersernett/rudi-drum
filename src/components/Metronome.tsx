import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { Box, Slider, Typography, Button } from "@mui/material";
import * as Tone from 'tone';
import tickSound from "../assets/Synth_Sine_C_lo.wav";
import tickSoundDown from "../assets/Synth_Sine_C_hi.wav";
import Blinker from "./Blinker";

interface SubCounterProps {
  subdivisions: number;
  setSubdivisions: Dispatch<SetStateAction<number>>;
  stop: () => void;
  start: () => void;
}

const SubCounter: React.FC<SubCounterProps> = ({ subdivisions, setSubdivisions, stop, start }) => {
  const subMin = 1
  const subMax = 8
  const incrementSubdivisions = (val: number): void => {
    const newValue = Math.min(Math.max(subdivisions + val, subMin), subMax);
    setSubdivisions(newValue);
  };

  // Use useEffect to listen for changes in subdivisions
  useEffect(() => {
    if (Tone.Transport.state === "started") {
      stop();

      // Use setTimeout to ensure the state has updated before calling start
      // setTimeout(() => {
        start();
      // }, 0); // Delay of 0 milliseconds
    }
  }, [subdivisions, ]);

  return (
    <Box>
      <Button onClick={() => incrementSubdivisions(-1)} disabled={subdivisions === subMin}>–</Button>
      <Button onClick={() => incrementSubdivisions(1)} disabled={subdivisions === subMax}>+</Button>
      <Typography>
        subdivisions: {subdivisions}
      </Typography>
    </Box>
  );
};

const Metronome = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [beat, setBeat] = useState(120);
  const [subdivisions, setSubdivisions] = useState(1);
  const sampler = useRef<Tone.Sampler | null>(null);
  const [isBlinking, setIsBlinking] = useState(false);

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
    Tone.context.lookAhead = 0.2
  }, [])

  function start() {
    if (Tone.Transport.state !== "started") {

      let noteString = "4n";
      switch (subdivisions) {
        case 1:
          break;
        case 2:
          noteString = "8n";
          break;
        case 3:
          noteString = "8t";
          break;
        case 4:
          noteString = "16n";
          break;
      }
      const subDivNotes = Array.from({ length: subdivisions - 1 }, () => "C3");

      const seq = new Tone.Sequence((time, note) => {
        if (sampler.current) {
          sampler.current.triggerAttackRelease(note, "32n", time);
        }
      }, ["C4", ...subDivNotes], noteString).start();

      Tone.Transport.scheduleRepeat((time) => {
        // sampler.triggerAttackRelease("C4", "16n", time);
        Tone.Draw.schedule(() => setIsBlinking(true), time);
      }, "4n");

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
      <SubCounter subdivisions={subdivisions} setSubdivisions={setSubdivisions} stop={stop} start={start} />
      <Blinker isBlinking={isBlinking} setIsBlinking={setIsBlinking} />
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
      <button id='starter' onClick={() => start()} disabled={!isLoaded}>Start</button>
      <button onClick={() => stop()}>Stop</button>
    </div>
  );
};

export default Metronome;
