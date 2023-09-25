import { useState } from "react";
import { Badge, Box, IconButton, Link, Typography, AppBar, Container, Toolbar, Menu, Button, MenuItem, useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from "../theme";
import LoginModal from "./LoginModal";

const TopBar = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  return (
    <AppBar>
      <Toolbar  >
        <IconButton
          size="large"
          edge="start"
          color="primary"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Placeholder
        </Typography>
        <Button color="primary" onClick={handleOpenLoginModal}><Typography variant='body2'>Login</Typography></Button>
        <LoginModal open={openLoginModal} onClose={handleCloseLoginModal} />
      </Toolbar>
    </AppBar>
  );
}

export default TopBar