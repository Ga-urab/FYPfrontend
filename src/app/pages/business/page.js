"use client";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from "@mui/icons-material/Share";
import Navbar from "../navbar";
import StarIcon from "@mui/icons-material/Star";
import { gql, useQuery } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import client from "../../../../apollo.config";

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
const GET_USER = gql`
  query GetUserById($userId: String!) {
    userById(_id: $userId) {
      _id
      username
      email
    }
  }
`;
const StaticPage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const { data } = await client.query({
          query: GET_BUSINESSES,
        });
        setBusinesses(data.Businesss);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBusinesses();

    return () => {
      setBusinesses([]);
      setLoading(true);
      setError(null);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(businesses, "hsfdhfakhs");
  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        {businesses &&
          businesses.map((business) => (
            <div
              key={business.id}
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
                  <h2>{business.name}</h2>
                  <QueryUser userId={business.author} />
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
    </ApolloProvider>
  );
};
const QueryUser = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId },
  });

  if (loading) return <p>Loading user...</p>;
  if (error) return <p>Unknown User</p>;

  return <p>{data.userById.username}</p>;
};
export default StaticPage;
