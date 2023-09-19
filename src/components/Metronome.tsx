import { useState, useEffect, useMemo, useRef } from "react";
import { Box, Slider, Typography } from "@mui/material";
import * as Tone from 'tone';
import tickSound from "../assets/Synth_Sine_C_lo.wav";
import tickSoundDown from "../assets/Synth_Sine_C_hi.wav";

interface BlinkingSquareProps {
  isBlinking: boolean;
  setIsBlinking: (isBlinking: boolean) => void;
}

const BlinkingSquare: React.FC<BlinkingSquareProps> = ({ isBlinking, setIsBlinking }) => {
  const squareStyle = {
    width: "50px",
    height: "50px",
    backgroundColor: isBlinking ? "orange" : "lightgray",
    borderRadius: '100%',
    // transition: "background-color 0.2s ease-in-out",
  };

  if (isBlinking) {
    // Tone.Draw.schedule(() => setIsBlinking(false), Tone.now() +Tone.Time("32n").toSeconds());
    Tone.Draw.schedule(() => setIsBlinking(false), Tone.now());
  }

  return <div id='sq' style={squareStyle} />;
};

const Metronome = () => {
  const [isLoaded, setLoaded] = useState(false);

  const [beat, setBeat] = useState(120);
  const sampler = useRef<Tone.Sampler | null>(null); 
  const [isBlinking, setIsBlinking] = useState(false);
  const [isBlinking2, setIsBlinking2] = useState(false);

  useEffect(() => {
    sampler.current = new Tone.Sampler({
      urls: {
        C3: tickSound,
        C4: tickSoundDown,
      },
      onload: () => {
        setLoaded(true);
      }
    }).toDestination();
    Tone.Transport.bpm.value = beat
    Tone.context.lookAhead = 0.2
  }, [])

  async function start() {
    const seq = await new Tone.Sequence((time, note) => {
      if (sampler.current) {
        sampler.current.triggerAttackRelease(note, "32n", time);
      }
    }, ["C4", "C3", "C3", "C3"], "16n").stop();

    seq.start();
    Tone.Transport.scheduleRepeat((time) => {
      // sampler.triggerAttackRelease("C4", "16n", time);
      Tone.Draw.schedule(() => setIsBlinking(true), time);
    }, "4n");

    Tone.Transport.scheduleRepeat((time) => {
      // sampler.triggerAttackRelease("C4", "16n", time);
      // Tone.Draw.schedule(() => setIsBlinking2(true), time + Tone.Time("8n").toSeconds());
    }, "4n");

    Tone.Transport.start();
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
    stop();
    processSliderValue(newValue, (value) => {
      setTimeout(() => {
        Tone.Transport.bpm.setValueAtTime(value, Tone.Transport.immediate());
      }, 100);
    });
    start();
  };

  const processSliderValue = (value: number | number[], updateState: (value: number) => void) => {
    if (typeof value === 'number') {
      updateState(value);
    } else {
      console.warn('Unexpected value:', value);
    }
  };

  useEffect(() => {
    const buttonElement = document.querySelector('button');
    if (buttonElement) {
      const clickHandler = async () => {
        await Tone.start();
        console.log('audio is ready');
        console.log(Tone.getContext())
      };
      buttonElement.addEventListener('click', clickHandler);

      return () => {
        buttonElement.removeEventListener('click', clickHandler);
      };
    }
  }, []);

  const blinkingSquare = useMemo(() => <BlinkingSquare isBlinking={isBlinking} setIsBlinking={setIsBlinking} />, [isBlinking]);
  const blinkingSquare2 = useMemo(() => <BlinkingSquare isBlinking={isBlinking2} setIsBlinking={setIsBlinking2} />, [isBlinking2]);

  return (
    <div className="metronome">
      {blinkingSquare}
      {/* {blinkingSquare2} */}
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
