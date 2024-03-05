"use client";
import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import client from "../../../../../apollo.config";

const GET_USERS = gql`
  query GetUsers {
    allUsers {
      _id
      username
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($userId: String!) {
    removeUser(id: $userId) {
      _id
    }
  }
`;

const UserListPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await client.query({ query: GET_USERS });
        setUsers(data.allUsers);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await client.mutate({
        mutation: DELETE_USER,
        variables: { userId },
      });
      // Remove the deleted user from the local state
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item key={user._id} xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              style={{ padding: "20px", position: "relative" }}
            >
              <Typography variant="h6">{user.username}</Typography>
              <Typography>Email: {user.email}</Typography>
              <Button
                variant="contained"
                color="error"
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                }}
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserListPage;
