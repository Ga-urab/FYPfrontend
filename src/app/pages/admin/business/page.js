"use client";
import React, { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import client from "../../../../../apollo.config";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
const GET_BUSINESSES = gql`
  query GetBusinesses {
    Businesss {
      _id
      name
      author
      description
      imgUrls
      point
    }
  }
`;
const DELETE_BUSINESS = gql`
  mutation DeleteBusiness($BusinessId: String!) {
    deleteBusiness(BusinessId: $BusinessId) {
      _id
    }
  }
`;

const BusinessListPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const { data } = await client.query({ query: GET_BUSINESSES });
        setBusinesses(data.Businesss);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [client]);
  console.log(businesses, "busi");
  const handleDelete = async (id) => {
    try {
      await client.mutate({
        mutation: DELETE_BUSINESS,
        variables: { BusinessId: id },
      });
      // Remove the deleted business from the local state
      setBusinesses((prevBusinesses) =>
        prevBusinesses.filter((business) => business._id !== id)
      );
    } catch (error) {
      console.error("Error deleting business:", error);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Business List
      </Typography>
      <Grid container spacing={2}>
        {businesses &&
          businesses.map((business) => (
            <Grid item key={business._id} xs={12} sm={6} md={4}>
              <Paper
                elevation={3}
                style={{ padding: "20px", position: "relative" }}
              >
                <Typography variant="h6">{business.name}</Typography>
                <Typography>{business.description}</Typography>
                <Button
                  variant="contained"
                  color="error"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                  }}
                  onClick={() => handleDelete(business._id)}
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

export default BusinessListPage;
