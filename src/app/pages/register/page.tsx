'use client';
import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Navbar from '../navbar';
import client from '../../../apollo.config';

const SIGNUP_MUTATION = gql`
  mutation Signup($firstName: String!, $lastName: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password, confirmPassword: $confirmPassword) {
      id
      email
    }
  }
`;

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [shandle] = useMutation(SIGNUP_MUTATION);

  const handleSignup = async () => {
    try {
      // Use the Apollo Client instance to execute the mutation
      const { data } = await client.mutate({
        mutation: SIGNUP_MUTATION,
        variables: {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        },
      });

      console.log('Signup success:', data);
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
