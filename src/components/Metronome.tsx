import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { Box, Slider, Typography, Button } from "@mui/material";
import * as Tone from 'tone';
import tickSound from "../assets/Synth_Sine_C_lo.wav";
import tickSoundDown from "../assets/Synth_Sine_C_hi.wav";
import Blinker from "./Blinker";
import SubdivisionCounter from "./SubdivisionCounter";
import Grader from "./Grader";
import PlayPause from "./PlayPause";

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
    Tone.Transport.cancel();
    const subDivNotes = Array.from({ length: subdivisions - 1 }, () => "C3");
    sequence.current = new Tone.Sequence((time, note) => {
      if (sampler.current) {
        sampler.current.triggerAttackRelease(note, "32n", time);
        // Tone.Draw.schedule(() => setIsBlinking(true), time); //this will blink EVERY subdivision
        // console.log('DOWNBEA7: ', time)
      }
    }, [["C4", ...subDivNotes]], "4n").start(restartTime);

    console.log("SEQ: ", sequence.current); //sequence.current.part.events[0]

    Tone.Transport.scheduleRepeat((time) => {
      Tone.Draw.schedule(() => setIsBlinking(true), time);
      // Tone.Draw.schedule(() => setIsBlinking(true), "+8n"); //8th note later
      console.log('DOWNBEAT: ', time)
    }, "4n", restartTime);
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

  const handleHelp = () => {
    console.log(Tone.Transport.state)
  }

  return (
    <Box className="metronome">
      <PlayPause restartSequence={restartSequence} isLoaded={isLoaded} />
      <Blinker isBlinking={isBlinking} setIsBlinking={setIsBlinking} />
      <SubdivisionCounter subdivisions={subdivisions} setSubdivisions={setSubdivisions} restartSequence={restartSequence} />

      <Box mt={1} display='flex' alignItems='center'>
        <Typography variant="body1" mr={2} sx={{ flexShrink: 0, }}>BPM</Typography>
        <Slider
          min={20}
          max={256}
          value={beat}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderCommit}
          sx={{ minWidth: '150px', }}
        />
        <Typography variant="body1" ml={2} sx={{ minWidth: '3ch' }}>{beat}</Typography>
      </Box>

      {/* <Button variant='contained' onClick={handleHelp}>Help</Button> */}
      <Grader />
    </Box>
  );
};

export default Metronome;
