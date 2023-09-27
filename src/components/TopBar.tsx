import { useState } from "react";
import { Typography, AppBar, Container, Toolbar, Button, } from "@mui/material";
import { theme } from "../theme";
import LoginModal from "./LoginModal";
import { useUserContext } from '../context/UserContext';
import MainMenu from "./MainMenu";
import UserMenu from "./UserMenu";

const TopBar = () => {
  const { username } = useUserContext();
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
          Placeholder
        </Typography>
        {username ? (
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