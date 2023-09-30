import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useMetronomeContext } from "../../context/MetronomeContext";
import metronomesService from '../../services/metronomes';
import { useUserContext } from "../../context/UserContext";
import { MetronomeItem } from "../../context/MetronomeContext";
import { useState } from "react";

interface SaveDialogProps {
  open: boolean;
  onClose: () => void;
  onSaveSuccess: (updatedData: MetronomeItem) => void;
  onUpdateSuccess: (updatedData: MetronomeItem) => void;
  metronomeData: MetronomeItem[]
}

const SaveDialog: React.FC<SaveDialogProps> = ({ open, onClose, onSaveSuccess, onUpdateSuccess, metronomeData }) => {
  const { metronome, setMetronome } = useMetronomeContext();
  const { user } = useUserContext();
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [matchingTitle, setMatchingTitle] = useState<MetronomeItem | null>(null);

  const handleClose = () => {
    onClose();
  }

  const findMatchingTitle = (title: string, metronomeData: MetronomeItem[]) => {
    return metronomeData.find((metronomeItem) => metronomeItem.title === title);
  };

  const handleOverwriteConfirm = async () => {
    try {
      //non-null assertion
      // const updatedMetronome: MetronomeItem = {
      // ...matchingTitle!,
      // ...metronome,
      // id: matchingTitle?.id ?? 0, // Provide a default value if id is undefined
      // };
      
      //type assertion:
      const updatedMetronome = {
        ...(matchingTitle as MetronomeItem),
        ...metronome,
      };
      console.log('attempting update with: ', updatedMetronome)
      const savedUpdatedMetronome = await metronomesService.update(updatedMetronome, user.token);
      onUpdateSuccess(savedUpdatedMetronome);
      handleClose();
      setConfirmationDialogOpen(false); // Close the confirmation dialog
    } catch (error) {
      console.log('UPDATE FAILED', error)
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('saving metronome...', metronome);
    try {
      const matchingTitleResult = findMatchingTitle(metronome.title, metronomeData);
      console.log("match?", matchingTitleResult)
      if (!matchingTitleResult) {
        const savedMetronome = await metronomesService.create(metronome, user.token)
        console.log('good save:', savedMetronome)
        onSaveSuccess(savedMetronome);
        handleClose();
      } else {
        // If a matching title is found, show the confirmation dialog
        setMatchingTitle(matchingTitleResult);
        setConfirmationDialogOpen(true);
      }

    } catch (error) {
      console.log('SAVE FAILED', error)
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} disableRestoreFocus>
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

      {/* Confirmation dialog for overwriting */}
      <Dialog open={confirmationDialogOpen} onClose={() => setConfirmationDialogOpen(false)}>
        <DialogTitle>{`Overwrite "${metronome.title}"?`}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOverwriteConfirm} color="primary">
            Overwrite
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  )
}

export default SaveDialog