"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import cookie from "react-cookies";

const Navbar = () => {
  const [loading, setLoading] = useState(true);
  const token = cookie.load("token");


  return (
    <Box zIndex={999}>
      <AppBar position="relative" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: '' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: 'black' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ paddingRight:'750px' }}>
            <img src={'/images/logo.png'} alt="Logo" style={{ height: '40px' }} />
          </Typography>
          <Link href="/">
            <Button color="inherit" sx={{ color: 'black',paddingRight:'100px' }}>
              Home
            </Button>
          </Link>
          <Link href="/pages/business">
            <Button color="inherit" sx={{ color: 'black',paddingRight:'100px' }}>
              Businesses
            </Button>
          </Link>
          <Link href="/pages/profile">
            <Button color="inherit" sx={{ color: 'black',paddingRight:'100px' }}>
              Profile
            </Button>
          </Link>
          {token ? (
                        <Link href="/pages/login">

            <Button color="inherit" sx={{ color: 'black' }}>
              Logout
            </Button>
            </Link>

          ) : (
            <Link href="/pages/login">
              <Button color="inherit" sx={{ color: 'black' }}>
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
