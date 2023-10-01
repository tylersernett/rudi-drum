import { useState, useEffect, useRef, } from "react";
import { Box, Slider, Typography, Button, Grid, } from "@mui/material";
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import * as Tone from 'tone';
import tickSound from "../assets/Synth_Sine_C_lo.wav";
import tickSoundDown from "../assets/Synth_Sine_C_hi.wav";
import Blinker from "./Blinker";
import SubdivisionCounter from "./SubdivisionCounter";
import Grader from "./Grader";
import PlayPause from "./PlayPause";
import { useMetronomeContext } from "../context/MetronomeContext";

const Metronome = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const { metronome, setMetronome } = useMetronomeContext();
  const sampler = useRef<Tone.Sampler | null>(null);
  const sequence = useRef<Tone.Sequence | null>(null);
  const [volume, setVolume] = useState(100);

  const { bpm, subdivisions } = metronome;

  useEffect(() => {
    sampler.current = new Tone.Sampler({
      urls: {
        C3: tickSound,
        C4: tickSoundDown,
      },
      onload: () => {
        setLoaded(true);
        Tone.Transport.bpm.value = bpm
      }
    }).toDestination();

    // restartSequence();
  }, [])

  //update tempo on bpm change (needed when bpm changes from a load or other non-slider input)
  useEffect(() => {
    Tone.Transport.bpm.value = bpm
  }, [bpm])

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

    // const drawLoop = 
    new Tone.Loop((time) => {
      Tone.Draw.schedule(() => {
        setIsBlinking(true)
      }, time) //use AudioContext time of the event
    }, "4n").start(restartTime)

    //ADD LATER: multiblink
    // const drawLoop2 = new Tone.Loop((time) => {
    //   Tone.Draw.schedule(() => {
    //     setIsBlinking(true)
    //   }, time) //use AudioContext time of the event
    // }, "4n").start(restartTime + Tone.Transport.toSeconds("20n"))
  }

  const handleSliderChange = (_event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    processSliderValue(newValue, (newBpm) => {
      setMetronome({
        ...metronome,
        bpm: newBpm,
      });
    });
  };
  const handleSliderCommit = (_event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    processSliderValue(newValue, (newBpm) => {
      setMetronome({
        ...metronome,
        bpm: newBpm,
      });
    });
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
    if (sampler.current) console.log(sampler?.current.volume)
  }

  const handleVolumeChange = (_event: React.SyntheticEvent | Event, value: number | number[]) => {
    if (typeof value === "number") {
      const volumeValue = mapToDecibels(value); // Convert to decibels
      setVolume(value);
      if (sampler.current) {
        if (value >= 1) {
          sampler.current.volume.value = volumeValue;
        } else {
          sampler.current.volume.value = sampler.current.volume.minValue;
        }
      }
    } else {
      console.warn("Unexpected value:", value);
    }
  }
  // Conversion function to map the 0 to 100 range to -50 to 0 dB range
  const mapToDecibels = (value: number) => {
    return -30 + (value / 100) * 30;
  };

  return (
    <Box className="metronome">
      <PlayPause restartSequence={restartSequence} isLoaded={isLoaded} />
      <Blinker isBlinking={isBlinking} setIsBlinking={setIsBlinking} />
      <SubdivisionCounter restartSequence={restartSequence} />

      <Box mt={1} display='flex' alignItems='center' sx={{ width: '250px', }}>
        <Typography variant="body1" mr={2} sx={{ flexShrink: 0, }} >BPM</Typography>
        <Slider
          min={20}
          max={256}
          value={bpm}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderCommit}
        />
        <Typography variant="body1" ml={2} sx={{ minWidth: '3ch' }}>{bpm}</Typography>
      </Box>

      <Grid container spacing={2} alignItems="center"  >
        <Grid item width={'5ch'}>
          {volume >= 1 ? <VolumeUp /> : <VolumeOffIcon />}
        </Grid>
        <Grid item xs>
          <Slider
            min={0}
            max={100}
            value={volume}
            onChange={handleVolumeChange}
            onChangeCommitted={handleVolumeChange}
          />
        </Grid>
        <Grid item width={'5ch'}>
          {volume}
        </Grid>
      </Grid>

      <Button variant='contained' onClick={handleHelp}>Help</Button>
      <Grader />
    </Box>
  );
};

export default Metronome;
