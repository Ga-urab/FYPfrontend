// components/Navbar.js
import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: 'black' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
            Your Logo
          </Typography>
          <Button color="inherit" sx={{ color: 'black' }}>Home</Button>
          <Button color="inherit" sx={{ color: 'black' }}>Businesses</Button>
          <Button color="inherit" sx={{ color: 'black' }}>Profile</Button>
          <Button color="inherit" sx={{ color: 'black' }}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
