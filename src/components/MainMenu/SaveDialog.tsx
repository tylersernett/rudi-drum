import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useMetronomeContext } from "../../context/MetronomeContext";
import metronomesService from '../../services/metronomes';
import { useUserContext } from "../../context/UserContext";
import { MetronomeItem } from "../../context/MetronomeContext";

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
  // const [savePatternTitle, setSavePatternTitle] = useState(""); // State to store the pattern title

  const handleClose = () => {
    // setSavePatternTitle(metronome.title)
    onClose();
  }

  const findMatchingTitle = (title: string, metronomeData: MetronomeItem[]) => {
    return metronomeData.find((metronomeItem) => metronomeItem.title === title);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('saving metronome...', metronome);
    try {
      const matchingTitle = findMatchingTitle(metronome.title, metronomeData);
      console.log("match?", matchingTitle)
      if (!matchingTitle) {
        const savedMetronome = await metronomesService.create(metronome, user.token)
        console.log('good save:', savedMetronome)
        onSaveSuccess(savedMetronome);
      } else {
        const updatedMetronome = {...matchingTitle, ...metronome}
        console.log('attempting update with: ', updatedMetronome)
        const savedUpdatedMetronome = await metronomesService.update(updatedMetronome, user.token)
        onUpdateSuccess(savedUpdatedMetronome);
      }
      handleClose();
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
    </Dialog>
  )
}

export default SaveDialog