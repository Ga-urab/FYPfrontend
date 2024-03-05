'use client';
import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Navbar from '../navbar';
import client from '../../../../apollo.config';

const SIGNUP_MUTATION = gql`
  mutation registerUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      _id
      email
    }
  }
`;

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [confirmPassword, setConfirmPassword] = useState('');


  const handleSignup = async () => {
    try {
      const { data } = await client.mutate({
        mutation: SIGNUP_MUTATION,
        variables: {
          username,
          email,
          password,
          //confirmPassword,
        },
      });
      setUsername('')
      setEmail('')
      setPassword('')
      console.log('Signup success:', data);
      window.location.href = "login";

    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Container style={{ paddingLeft: '0%' }}>
        <Typography variant="h4" gutterBottom sx={{ paddingLeft: '39%' }}>
          Let's Get Started!
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
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '20px',
              maxWidth: '400px',
              width: '100%',
              height: 'auto',
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ paddingLeft: '30%' }}>
              Sign Up
            </Typography>
            <TextField
              label="First Name"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
            />
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

            <Button
              variant="contained"
              color="primary"
              onClick={handleSignup}
              fullWidth
              sx={{ margin: '5% 0' }}
            >
              Sign Up
            </Button>
            <Typography variant="h5" sx={{ padding: '2% 5%' }}>
              Already a user? Let's Log In <a href="/pages/login">here</a>.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignupPage;
