import { useState, useEffect, useRef, } from "react";
import { Box, Slider, Typography, Grid, Button, } from "@mui/material";
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import * as Tone from 'tone';
import tickSound from "../assets/Synth_Sine_C_lo.wav";
import tickSoundDown from "../assets/Synth_Sine_C_hi.wav";
import Blinker from "./Blinker";
import SubdivisionCounter from "./SubdivisionCounter";
// import Grader from "./Grader";
import PlayPause from "./PlayPause";
import { useMetronomeContext } from "../context/MetronomeContext";
import { TimeObject } from "tone/build/esm/core/type/Units";
import BlinkToggle from "./BlinkToggle";
import { BlinkToggleOption } from "../types";

const Metronome = () => {
  const [isLoaded, setLoaded] = useState(false);
  // const [isBlinking, setIsBlinking] = useState(false);
  const { metronome, setMetronome } = useMetronomeContext();
  const { blinkToggle } = metronome;
  const sampler = useRef<Tone.Sampler | null>(null);
  const sequence = useRef<Tone.Sequence | null>(null);
  const [volume, setVolume] = useState(100);

  const { bpm, subdivisions } = metronome;
  const [isBlinking, setIsBlinking] = useState<boolean[]>(() => {
    return Array.from({ length: metronome.subdivisions }, () => false);
  });

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
    Tone.Draw.cancel();
    console.log("subs:", subdivisions, "arrLen: ", isBlinking.length)
    const subDivNotes = Array.from({ length: subdivisions - 1 }, () => "C3"); //the notes NOT on the downbeat
    sequence.current = new Tone.Sequence((time, note) => {
      if (sampler.current) {
        sampler.current.triggerAttackRelease(note, "32n", time);

        //blink every beat -- MonoAll
        // Tone.Draw.schedule(() => setIsBlinking(prevIsBlinking => {
        //   const updatedIsBlinking = [...prevIsBlinking];
        //   updatedIsBlinking[0] = true;
        //   return updatedIsBlinking;
        // }), time); 
      }
    }, [["C4", ...subDivNotes]], "4n").start(restartTime);

    new Tone.Loop((time) => {
      // for (let i = 0; i < (blinkToggle === BlinkToggleOption.All ? subdivisions : 1); i++) {
      for (let i = 0; i < subdivisions; i++) {
        const prefix = 4 * subdivisions;
        const timeStr = `${prefix}n`;
        //Object, ({"4n" : 3, "8t" : -1}). The resulting time is equal to the sum of all of the keys multiplied by the values in the object.
        const timeObj = { [timeStr]: i } as TimeObject
        const timeString = i === 0 ? time : time + Tone.Transport.toSeconds(timeObj)
        Tone.Draw.schedule(() => {
          setIsBlinking(prevIsBlinking => {
            console.log(prevIsBlinking)
            const updatedIsBlinking = [...prevIsBlinking];
              updatedIsBlinking[i] = true; // Only update if index already exists - prevent state error
            console.log(updatedIsBlinking)
            return updatedIsBlinking;
          })
        }, timeString) //use AudioContext time of the event
      }
    }, "4n").start(restartTime)
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

    const asyncClickHandler = async () => {
      try {
        await Tone.start();
        console.log('audio is ready');
        console.log(Tone.getTransport());
      } catch (error) {
        console.error('Error starting audio:', error);
      }
    };

    if (buttonElement) {
      const clickHandler = () => {
        asyncClickHandler().catch((error) => {
          console.error('Async click handler failed:', error);
        });
      };

      buttonElement.addEventListener('click', clickHandler);

      return () => {
        buttonElement.removeEventListener('click', clickHandler);
      };
    }
  }, []);

  const handleHelp = () => {
    // if (sampler.current) console.log(sampler?.current.volume)
    console.log(isBlinking)
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
      <BlinkToggle />
      <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width:'320px' }} mb={1}>
        {isBlinking.map((blinking, index) => (
          //if Downbeat or MonoAll, only render the FIRST Blinker
          (blinkToggle === BlinkToggleOption.All || blinkToggle === BlinkToggleOption.Off ||
            (blinkToggle === BlinkToggleOption.Downbeat && index === 0) || (blinkToggle === BlinkToggleOption.MonoAll && index === 0)) && (
            <Blinker key={index} isBlinking={blinking} setIsBlinking={(newBlinking) => {
              setIsBlinking((prevIsBlinking) => {
                const updatedIsBlinking = [...prevIsBlinking];
                updatedIsBlinking[index] = newBlinking;
                return updatedIsBlinking;
              });
            }} />
          )
        ))}
      </Box>
      <SubdivisionCounter restartSequence={restartSequence} setIsBlinking={setIsBlinking} />

      <Box mt={0} display='flex' alignItems='center' sx={{ width: '320px', margin: 'auto' }}>
        <Typography variant="body1" mr={1} sx={{ width: '50px', flexShrink: 0 }}>BPM</Typography>
        <Slider
          min={20}
          max={256}
          value={bpm}
          sx={{ width: '220px' }}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderCommit}
        />
        <Typography variant="body1" ml={1} sx={{ width: '50px', flexShrink: 0, minWidth: '3ch' }}>{bpm}</Typography>
      </Box>

      <Box mt={0} display='flex' alignItems='center' sx={{ width: '320px', margin: 'auto' }}>
        <Box mr={1} sx={{ width: '50px', flexShrink: 0 }} display='flex' alignItems='center' justifyContent='center'>
          {volume >= 1 ? <VolumeUp /> : <VolumeOffIcon />}
        </Box>
        <Slider
          min={0}
          max={100}
          sx={{ width: '220px' }}
          value={volume}
          onChange={handleVolumeChange}
          onChangeCommitted={handleVolumeChange}
        />
        <Typography variant="body1" ml={1} sx={{ width: '50px', flexShrink: 0, minWidth: '3ch' }}>{volume}</Typography>
      </Box>

      <Button variant='contained' onClick={handleHelp}>Help</Button>
      {/* <Grader /> */}
    </Box >
  );
};

export default Metronome;
