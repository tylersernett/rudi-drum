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
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Call the onSignUp callback with the entered username and password
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }
    // Clear any previous password error
    setPasswordError(null);
    onSignUp(username, password);
  };

  useEffect(() => {
    // Reset username and password when the component mounts
    setUsername('');
    setPassword('');
    setPasswordError(null);
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} disableRestoreFocus sx={{width:'440px', maxWidth:'100%', margin:'auto'}}>
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
            error={!!passwordError}
            helperText={passwordError}
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
