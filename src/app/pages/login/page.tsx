'use client';
import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Navbar from '../navbar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <>
    <Navbar />
    <Container style={{paddingLeft:'0%'}}>
                <Typography variant="h4" gutterBottom sx={{paddingLeft:'39%'}}>
            Welcome User!
          </Typography>
          <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '50px',
        }}
      >
              <Box
          sx={{
            marginTop: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '400px',

            width: '100%',
            height:'auto'
          }}
        >
          <Typography variant="h4" gutterBottom sx={{paddingLeft:'30%'}}>
            Login
          </Typography>



          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleLogin} fullWidth  sx={{margin:'5% 0'}}>
            Login
          </Button>
          <Typography variant="h5" sx={{padding:'2% 5%'}}>
            Not a user? Sign Up <a href="/pages/register">here</a>
          </Typography>
        </Box>

        </Box>
     
    </Container>
    </>
  );
};

export default LoginPage;
