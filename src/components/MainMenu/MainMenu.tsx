import React, { useEffect, useState } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useUserContext } from '../../context/UserContext';
import { useMetronomeContext } from "../../context/MetronomeContext";
import SaveDialog from './SaveDialog';
import BrowseDialog from './BrowseDialog';
import SignUpDialog from './SignUpDialog';
import usersService from '../../services/users';
import metronomesService from '../../services/metronomes';
import { MetronomeItem } from '../../context/MetronomeContext';

const MainMenu = () => {
  const { user } = useUserContext();
  const { resetMetronome } = useMetronomeContext();
  const [metronomeLoaded, setMetronomeLoaded] = useState(false);
  const [metronomeData, setMetronomeData] = useState<MetronomeItem[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isSaveDialogOpen, setSaveDialogOpen] = useState(false); // State to control the dialog open/close
  const [isSignUpDialogOpen, setSignUpDialogOpen] = useState(false);
  // const [openMetronomeTable, setOpenMetronomeTable] = useState(false); // State to control the metronome table visibility
  const [isBrowseDialogOpen, setBrowseDialogOpen] = useState(false);

  //LOAD IN THE METRONOME DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.token) {
          setMetronomeLoaded(false);
          const data = await metronomesService.getOwn(user.token);
          console.log('Fetched metronome data:', data);
          setMetronomeData(data);
          setMetronomeLoaded(true);
        }
      } catch (error) {
        console.error('Error fetching metronome data:', error);
      }
    };

    fetchData();
  }, [user]);

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

  const handleOpenSaveDialog = () => {
    setSaveDialogOpen(true);
    handleClose();
  }

  const handleCloseSaveDialog = () => {
    setSaveDialogOpen(false);
  };

  const handleSaveSuccess = (updatedData: MetronomeItem) => {
    setMetronomeData((prevData) => [...prevData, updatedData]);
  };

  const handleUpdateSuccess = (updatedData: MetronomeItem) => {
    setMetronomeData((prevData) =>
      prevData.map((metronomeItem) =>
        metronomeItem.id === updatedData.id ? updatedData : metronomeItem
      )
    );
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

      <BrowseDialog open={isBrowseDialogOpen} onClose={handleCloseBrowsePatternsDialog} metronomeData={metronomeData} setMetronomeData={setMetronomeData} metronomeLoaded={metronomeLoaded} />
      <SaveDialog open={isSaveDialogOpen} onClose={handleCloseSaveDialog} onSaveSuccess={handleSaveSuccess} onUpdateSuccess={handleUpdateSuccess} metronomeData={metronomeData} />
      <SignUpDialog open={isSignUpDialogOpen} onClose={handleCloseSignUpDialog} onSignUp={handleSignUp} />
    </>
  )
}

export default MainMenu