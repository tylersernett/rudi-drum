import { useState } from "react";
import { Typography, AppBar, Toolbar, Button, } from "@mui/material";
import LoginModal from "./LoginModal";
import { useUserContext } from '../context/UserContext';
import MainMenu from "./MainMenu";
import UserMenu from "./UserMenu";
import { useMetronomeContext } from "../context/MetronomeContext";

const TopBar = () => {
  const { user } = useUserContext();
  const {metronome} = useMetronomeContext();
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  return (
    <AppBar>
      <Toolbar >
        <MainMenu />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {metronome.title}
        </Typography>
        {user.username ? (
          <UserMenu />
        ) : (
          <Button color="primary" onClick={handleOpenLoginModal}><Typography variant='body2'>Login</Typography></Button>
        )}
        <LoginModal open={openLoginModal} onClose={handleCloseLoginModal} />
      </Toolbar>
    </AppBar>
  );
}

export default TopBar