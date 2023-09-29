import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

interface SignUpDialogProps {
  open: boolean;
  onClose: () => void;
  onSignUp: (username: string, password: string) => void;
}

const SignUpDialog: React.FC<SignUpDialogProps> = ({ open, onClose, onSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Call the onSignUp callback with the entered username and password
    onSignUp(username, password);
  };

  useEffect(() => {
    // Reset username and password when the component mounts
    setUsername('');
    setPassword('');
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} disableRestoreFocus>
      <form onSubmit={handleSignUp}>
        <DialogTitle>New User Sign Up</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type='submit' color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SignUpDialog;
