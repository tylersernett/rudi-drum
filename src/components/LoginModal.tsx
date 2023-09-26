import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, } from '@mui/material';
import loginService from '../services/login';
import { useUserContext } from '../context/UserContext';
interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const { setUserInfo } = useUserContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => {
    setUsername('');
    setPassword('');
    onClose();
  };

  const handleLogin = async () => {
    // ADD SERVER LOGIC !!!
    console.log('Username:', username);
    console.log('Password:', password);
    try {
      const user = await loginService.login({ username, password })
      console.log('good login:', user)
      setUserInfo(user.username, user.token)
      handleClose();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLogin} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
