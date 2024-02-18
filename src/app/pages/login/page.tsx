'use client';
// LoginPage.tsx
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Navbar from '../navbar';
import client from '../../../../apollo.config'; // Import Apollo Client instance

// Define the login query
const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      firstName
      lastName
      email
    }
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data, loading, error } = useQuery(LOGIN_QUERY, {
    variables: {
      email,
      password,
    },
    client: client, // Use the correct variable name for Apollo Client instance
    skip: true,
  });

  const handleLogin = async () => {
    try {
      // Execute the login query
      await client.query({
        query: LOGIN_QUERY,
        variables: {
          email,
          password,
        },
      });

      // Handle the successful login response, e.g., redirect or show a success message
      console.log('Login success:', data.login);
      'Success fully loggedin'
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Login error:');
    }
  };

  return (
    <>
      <Navbar />
      <Container style={{ paddingLeft: '0%' }}>
        <Typography variant="h4" gutterBottom sx={{ paddingLeft: '39%' }}>
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
              height: 'auto',
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ paddingLeft: '30%' }}>
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              fullWidth
              sx={{ margin: '5% 0' }}
            >
              Login
            </Button>
            <Typography variant="h5" sx={{ padding: '2% 5%' }}>
              Not a user? Sign Up <a href="/pages/register">here</a>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
