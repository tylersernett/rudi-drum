import { useState, Dispatch, SetStateAction } from "react";
import { Box, Slider, Typography, Button } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import * as Tone from 'tone';

interface PlayPauseProps {
  restartSequence: (restartTime?: number) => void;
  isLoaded: boolean;
}

const PlayPause: React.FC<PlayPauseProps> = ({ restartSequence, isLoaded }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    if (!isPlaying) {
      if (Tone.Transport.state !== "started") {
        Tone.Transport.start();
      }
      restartSequence();
    } else {
      Tone.Transport.stop();
    }
    setIsPlaying(!isPlaying)
  }
  return (
    <Box my={3}>
      <Button variant='contained' id='starter' onClick={handlePlayClick} disabled={!isLoaded}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </Button>
    </Box>
  )
}

export default PlayPause