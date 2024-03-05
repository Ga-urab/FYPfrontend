"use client";
import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Navbar from "../navbar";
import client from "../../../../apollo.config"; // Import Apollo Client instance
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  useEffect(() => {
    removeCookie("token"); // Remove the token cookie
  }, []);
  const handleLogin = async () => {
    try {
      const { data } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email,
          password,
        },
      });
      const token = data?.login;
      setCookie("token", token);
      if (token) {
        window.location.href = "profile";
        console.log("Login success! Token stored in cookie:", token);
      } else {
        console.error("Token not found in login response");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container style={{ paddingLeft: "0%" }}>
        <Typography variant="h4" gutterBottom sx={{ paddingLeft: "39%" }}>
          Welcome User!
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <Box
            sx={{
              marginTop: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              maxWidth: "400px",
              width: "100%",
              height: "auto",
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ paddingLeft: "30%" }}>
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
              sx={{ margin: "5% 0" }}
            >
              Login
            </Button>
            <Typography variant="h5" sx={{ padding: "2% 5%" }}>
              Not a user? Sign Up <a href="/pages/register">here</a>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
