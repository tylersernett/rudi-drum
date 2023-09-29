import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import logoutService from "../services/logout";
import { useUserContext } from '../context/UserContext';

const UserMenu = () => {
  const { user, clearUserInfo } = useUserContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    console.log('LOGOUT attempt')
    try {
      await logoutService.logout(user.token)
      console.log('logout success')
      clearUserInfo()
      window.localStorage.removeItem('loggedRudiUser')
    } catch (error) {
      console.log('error logging out', error)
    }
  };

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="primary"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleClick}
      >
        <AccountCircleIcon fontSize='large' />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Typography variant='h5' mx={2} mb={1} color='primary'>{user.username}</Typography>
        <MenuItem onClick={handleClose} autoFocus>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu