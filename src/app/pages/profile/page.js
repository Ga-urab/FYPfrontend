"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Input,
  Paper,
  IconButton,
} from "@mui/material";
import Navbar from "../navbar";
import StarIcon from "@mui/icons-material/Star";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import client from "../../../../apollo.config";
import cookie from "react-cookies";

const CREATE_BUSINESS_MUTATION = gql`
  mutation CreateBusiness(
    $name: String!
    $description: String!
    $imgUrls: [String!]!
    $author: String!
  ) {
    createBusiness(
      name: $name
      description: $description
      author: $author
      point: 10
      imgUrls: $imgUrls
    ) {
      _id
      name
      description
      author
      point
      imgUrls
    }
  }
`;

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
const INCREASE_POINTS_MUTATION = gql`
  mutation IncreasePoints($_id: String!, $point: Float!) {
    increasePoints(_id: $_id, point: $point) {
      _id
      point
    }
  }
`;
const ProfilePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [totalPoints, setTotalPoints] = useState(150);
  //const [selectedFile, setSelectedFile] = (useState ) | (null > null);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [businessId, setBusinessId] = useState("");

  // const [increasePoints] = useMutation(INCREASE_POINTS_MUTATION);

  const token = cookie.load("token");
  useEffect(() => {
    if (!token) {
      window.location.href = "login";
    }
  }, [token]);

  if (!token) {
    return null;
  }
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  const user = parseJwt(token);
  console.log(user, "user aayo?");

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const { data } = await client.query({
          query: GET_BUSINESSES,
        });
        setBusinesses(
          data.Businesss.filter((business) => business.author === user?.userId)
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching businesses:", error);
      }
    };

    if (user) {
      fetchBusinesses();
    }

    return () => {
      setBusinesses([]);
      setLoading(true);
      setError(null);
    };
  }, [user.userId]);
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setSelectedFile(event.target.files[0]);
  //   } else {
  //     setSelectedFile(null);
  //   }
  // };
  // const handleIncreasePoints = (id) => {
  //   setBusinessId(id);
  //   increasePoints({
  //     variables: {
  //       _id: businessId,
  //       point: "10",
  //     },
  //   })
  //     .then((response) => {
  //       console.log("Points increased:", response.data.increasePoints);
  //       // Optionally, you can update the UI to reflect the new points
  //     })
  //     .catch((error) => {
  //       console.error("Error increasing points:", error);
  //     });
  // };
  const handleIncreasePoints = (id, points) => {
    client
      .mutate({
        mutation: INCREASE_POINTS_MUTATION,
        variables: {
          _id: id,
          point: points,
        },
      })
      .then((response) => {
        console.log("Points increased:", response.data.increasePoints);
        // Optionally, you can update the UI to reflect the new points
      })
      .catch((error) => {
        console.error("Error increasing points:", error);
      });
  };

  const handleAddBusiness = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await axios.post(
          "http://localhost:3004/upload",
          formData
        );
        console.log("File uploaded successfully:", response);

        setImage(response.data.path);

        await client.mutate({
          mutation: CREATE_BUSINESS_MUTATION,
          variables: {
            name: title,
            description: description,
            imgUrls: [response.data.path],
            author: user.userId,
          },
          refetchQueries: [{ query: GET_BUSINESSES }],
        });

        setTitle("");
        setDescription("");
        setSelectedFile(null);
      } else {
        console.error("No file selected.");
      }
    } catch (error) {
      console.error("Error creating business:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container sx={{ justifyContent: "center" }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          style={{ maxWidth: "400px" }}
        >
          <Grid item xs={12}>
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Input type="file" />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddBusiness}
            >
              Add Business
            </Button>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Typography variant="h6">Total Points: {totalPoints}</Typography>
        </Box>
      </Container>
      <Typography
        sx={{ fontSize: "30px", marginLeft: "40%", paddingTop: "7%" }}
      >
        My Businesses
      </Typography>
      {businesses &&
        businesses.map((business) => (
          <div
            key={business._id}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Paper
              elevation={3}
              style={{
                padding: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                marginTop: "45px",
              }}
            >
              <div>
                <div>
                  <Button
                    onClick={() => handleIncreasePoints(business._id, 10)}
                  >
                    Increase by 10
                  </Button>
                  <Button
                    onClick={() => handleIncreasePoints(business._id, 20)}
                  >
                    Increase by 20
                  </Button>
                  <Button
                    onClick={() => handleIncreasePoints(business._id, 30)}
                  >
                    Increase by 30
                  </Button>
                  <Button
                    onClick={() => handleIncreasePoints(business._id, 40)}
                  >
                    Increase by 40
                  </Button>
                </div>

                {/* Pass the business ID */}
                <h2>{business.name}</h2>
                <h2>{user.name}</h2>
              </div>
              <p>{business.description}</p>
              <img
                src={business.imgUrls[0]}
                alt="Business Photo"
                style={{
                  width: "700px",
                  height: "auto",
                  borderRadius: "5%",
                  marginRight: "15px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <IconButton>
                  <StarIcon />
                </IconButton>
                <span>{business.point} Stars</span>
                <IconButton style={{ marginLeft: "15px" }}>
                  <ChatBubbleIcon />
                </IconButton>
                <span>4 Comments</span>
                <IconButton style={{ marginLeft: "15px" }}>
                  <ShareIcon />
                </IconButton>
                <span>2 Shares</span>
              </div>
            </Paper>
          </div>
        ))}
    </>
  );
};

export default ProfilePage;
