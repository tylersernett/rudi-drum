import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, TextField, } from '@mui/material';
import loginService from '../services/login';
import { useUserContext } from '../context/UserContext';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const { setUser } = useUserContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setError('')
    onClose();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password })
      console.log('good login:', user)
      setUser({ username: user.username, token: user.token })
      window.localStorage.setItem('loggedRudiUser', JSON.stringify(user))
      handleClose();
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='xs' disableRestoreFocus>
      <form onSubmit={handleLogin}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl fullWidth error={!!error}>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type='submit' >
            Login
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LoginModal;
