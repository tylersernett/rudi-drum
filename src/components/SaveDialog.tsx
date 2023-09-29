import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useMetronomeContext } from "../context/MetronomeContext";
import metronomesService from '../services/metronomes';
import { useUserContext } from "../context/UserContext";

interface SaveDialogProps {
  open: boolean;
  onClose: () => void;
}

const SaveDialog: React.FC<SaveDialogProps> = ({ open, onClose }) => {
  const { metronome, setMetronome } = useMetronomeContext();
  const { user } = useUserContext();
  // const [savePatternTitle, setSavePatternTitle] = useState(""); // State to store the pattern title

  const handleClose = () => {
    // setSavePatternTitle(metronome.title)
    onClose();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('saving metronome...', metronome);
    try {
      const savedMetronome = await metronomesService.create(metronome, user.token)
      console.log('good save:', savedMetronome)
      // setUserInfo(savedMetronome.username, savedMetronome.token)
      // setMetronome(savedMetronome);
      handleClose();
    } catch (error) {
      // setError('Login failed. Please check your credentials.');
      console.log('SAVE FAILED', error)
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Save Pattern</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={metronome.title}
            onChange={(e) => setMetronome({ ...metronome, title: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type='submit' color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default SaveDialog