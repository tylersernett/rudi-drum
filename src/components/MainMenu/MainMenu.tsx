import React, { useState } from 'react';
import { ClickAwayListener, IconButton, Menu, MenuItem, Tooltip, Popover } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useUserContext } from '../../context/UserContext';
import { useMetronomeContext } from "../../context/MetronomeContext";
import SaveDialog from './SaveDialog';
import BrowseDialog from './BrowseDialog';
import SignUpDialog from './SignUpDialog';
import usersService from '../../services/users';
import loginService from '../../services/login';

const MainMenu = () => {
  const { user } = useUserContext();
  const { metronome, setMetronome, resetMetronome } = useMetronomeContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isSaveDialogOpen, setSaveDialogOpen] = useState(false); // State to control the dialog open/close
  const [isSignUpDialogOpen, setSignUpDialogOpen] = useState(false);
  // const [openMetronomeTable, setOpenMetronomeTable] = useState(false); // State to control the metronome table visibility
  const [isBrowseDialogOpen, setBrowseDialogOpen] = useState(false);


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    // setOpenMetronomeTable(false);
  };

  const handleResetPattern = () => {
    console.log('resetting pattern...')
    resetMetronome();
  }
  const handleLoadPattern = () => {
    const testBpm = 163
    const testSub = 3
    const testBlink = false;
    console.log('loading pattern...')
    setMetronome({ title: 'test', bpm: testBpm, subdivisions: testSub, blinkToggle: testBlink })
  }
  // const handleSavePattern = () => {
  //   console.log('saving pattern...', metronome)
  // }

  const handleOpenSaveDialog = () => {
    setSaveDialogOpen(true);
    handleClose();
  }

  const handleCloseSaveDialog = () => {
    setSaveDialogOpen(false);
  };

  const handleOpenSignUpDialog = () => {
    setSignUpDialogOpen(true);
    handleClose();
  };

  const handleCloseSignUpDialog = () => {
    setSignUpDialogOpen(false);
  };

  const handleOpenBrowsePatternsDialog = () => {
    setBrowseDialogOpen(true);
    handleClose();
  };

  const handleCloseBrowsePatternsDialog = () => {
    setBrowseDialogOpen(false);
  };


  const handleSignUp = async (username: string, password: string) => {
    try {
      const newUser = { username, password }
      await usersService.create(newUser)
      handleCloseSignUpDialog();
    } catch (error) {
      console.log('error submitting sign up: ', error)
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
        <MenuIcon fontSize='large' />
      </IconButton>
      {/* some repitition in the following...but MUI Menus cannot contain fragment children, so this seems the best way... */}
      {user.username ? (
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
          {/* <MenuItem key="load" onClick={handleLoadPattern} >Load Pattern</MenuItem> */}
          <MenuItem onClick={handleOpenBrowsePatternsDialog} >Browse Patterns</MenuItem>
          <MenuItem key="save" onClick={handleOpenSaveDialog} >Save Pattern</MenuItem>
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
          <MenuItem onClick={handleOpenSignUpDialog}>Sign Up</MenuItem>
        </Menu >
      )}

      <BrowseDialog open={isBrowseDialogOpen} onClose={handleCloseBrowsePatternsDialog} />
      <SaveDialog open={isSaveDialogOpen} onClose={handleCloseSaveDialog} />
      <SignUpDialog open={isSignUpDialogOpen} onClose={handleCloseSignUpDialog} onSignUp={handleSignUp} />
    </>
  )
}

export default MainMenu