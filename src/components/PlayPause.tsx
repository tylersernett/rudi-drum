import { Dispatch, SetStateAction, } from "react";
import { Box, Button } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import * as Tone from 'tone';

interface PlayPauseProps {
  restartSequence: (restartTime?: number) => void;
  isLoaded: boolean;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

const PlayPause: React.FC<PlayPauseProps> = ({ restartSequence, isLoaded, isPlaying, setIsPlaying }) => {

  const handlePlayClick = () => {
    if (!isPlaying) {
      //only runs the FIRST time play is clicked
      if (Tone.Transport.state !== "started") {
        Tone.Transport.start("+0.1"); //start 100 ms in future to avoid initial pops
      }
      
      restartSequence();
    } else { //PAUSE
      console.log('cancel??')
      Tone.Draw.cancel();
      Tone.Transport.cancel();
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