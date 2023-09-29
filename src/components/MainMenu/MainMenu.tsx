import React, { useState } from 'react';
import { ClickAwayListener, IconButton, Menu, MenuItem, Tooltip, Popover } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useUserContext } from '../../context/UserContext';
import { useMetronomeContext } from "../../context/MetronomeContext";
import SaveDialog from '../SaveDialog';
import LoadMenu from './LoadMenu';

const MainMenu = () => {
  const { user } = useUserContext();
  const { metronome, setMetronome, resetMetronome } = useMetronomeContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isSaveDialogOpen, setSaveDialogOpen] = useState(false); // State to control the dialog open/close
  // const [openMetronomeTable, setOpenMetronomeTable] = useState(false); // State to control the metronome table visibility
  const [anchorPopover, setAnchorPopover] = useState<null | HTMLElement>(null); // State to control the popover open/close

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
  }

  const handleCloseSaveDialog = () => {
    setSaveDialogOpen(false);
  };

  const handleBrowsePatterns = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorPopover(event.currentTarget); // Open the popover
  };

  const handleClosePopover = () => {
    setAnchorPopover(null); // Close the popover
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
          <MenuItem onClick={handleBrowsePatterns} >Browse Patterns</MenuItem>
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
          <MenuItem onClick={handleClose}>Sign Up</MenuItem>
        </Menu >
      )}

      <SaveDialog open={isSaveDialogOpen} onClose={handleCloseSaveDialog} />

      {/* Popover for Browse Patterns */}
      <Popover
        open={Boolean(anchorPopover)}
        anchorEl={anchorPopover}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <LoadMenu />
      </Popover>
    </>
  )
}

export default MainMenu