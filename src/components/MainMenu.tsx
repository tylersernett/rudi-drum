import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useUserContext } from '../context/UserContext';

const MainMenu = () => {
  const { username } = useUserContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleResetPattern = () => {
    console.log('resetting pattern...')
  }
  const handleLoadPattern = () => {
    console.log('loading pattern...')
  }
  const handleSavePattern = () => {
    console.log('saving pattern...')
  }

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
        <MenuIcon fontSize='large' />
      </IconButton>
      {username ? (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Advanced Settings</MenuItem>
          <MenuItem onClick={handleResetPattern}>Reset Pattern</MenuItem>
          <MenuItem key="load" onClick={handleLoadPattern} >Load Pattern</MenuItem>
          <MenuItem key="save" onClick={handleSavePattern} >Save Pattern</MenuItem>
        </Menu>
      ) : (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Advanced Settings</MenuItem>
          <MenuItem onClick={handleResetPattern}>Reset Pattern</MenuItem>
          <Tooltip title="Login to Load Patterns" placement="right" arrow>
            {/* add span to allow tooltip over disabled element */}
            <span>
              <MenuItem disabled>Load Pattern</MenuItem>
            </span>
          </Tooltip>
          <Tooltip title="Login to Save Patterns" placement="right" arrow>
            <span>
              <MenuItem disabled>Save Pattern</MenuItem>
            </span>
          </Tooltip>
          <MenuItem onClick={handleClose}>Sign Up</MenuItem>
        </Menu >
      )}
    </>
  )
}

export default MainMenu