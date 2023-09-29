import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

const DeleteDialog: React.FC<DeleteConfirmationDialogProps> = ({ open, onClose, onConfirmDelete }) => {
  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete metronome?</DialogTitle>
      <DialogContent>
        <Typography variant="body1">This action cannot be undone.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirmDelete} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
