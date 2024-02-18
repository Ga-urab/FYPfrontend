'use client';
import React, { ChangeEvent ,useCallback, useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Box, Input } from '@mui/material';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import Navbar from '../navbar';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { gql, useMutation } from '@apollo/client';
import client from '../../../../apollo.config'
import { ApolloProvider } from '@apollo/client';

const CREATE_BUSINESS_MUTATION = gql`
  mutation CreateBusiness($name: String!, $description: String!, $imgUrls: [String!]!) {
    createBusiness(name: $name, description: $description,  author: "Author", point: 10, imgUrls: $imgUrls) {
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


const ProfilePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [totalPoints, setTotalPoints] = useState(150);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  //const [createBusiness] = useMutation(CREATE_BUSINESS_MUTATION);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null); // Reset to null if no file is selected
    }
  };
  const handleAddBusiness = async () => {
    try {
      await client.mutate({
        mutation: CREATE_BUSINESS_MUTATION,
        variables: {
          name: title,
          description: description,
          imgUrls: [image],
        },
        refetchQueries: [{ query: GET_BUSINESSES }],
      });
      // Clear form fields after successful submission
      setTitle("");
      setDescription("");
      setImage("");
    } catch (error) {
      console.error("Error creating business:", error);
    }
  };


  // const handleAddBusiness = () => {
  //   console.log('Title:', title);
  //   console.log('Description:', description);
  //   console.log('Image:', image);
  // };

  // const handleAddBusiness = async () => {
  //   try {
  //     // Make GraphQL mutation call to create the business
  //     const { data } = await createBusiness({
  //       variables: {
  //         name: title,
  //         description: description,
  //         author: 'User Name', // Replace 'User Name' with the actual username
  //         point: 0, // Assuming you have a default value for point
  //         imgUrls: [image], // Assuming you want to add only one image URL
  //       },
  //     });
      
  //     // Clear the form fields after successful submission
  //     setTitle('');
  //     setDescription('');
  //     setImage('');

  //     console.log('Business added:', data);
  //   } catch (error) {
  //     console.error('Error adding business:', error);
  //   }
  // };

  

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        // Make POST request to upload file
        const response = await axios.post('http://localhost:3001/upload', formData);
        console.log('File uploaded successfully:', response);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('No file selected.');
    }
  };
  return (
    <ApolloProvider client={client}>

    <>
    <div>
      <Input type="file" onChange={handleFileChange} />
      <Button variant="contained" component="label" onClick={handleFileUpload}>
        Upload
      </Button>
    </div>

    <Navbar />
    <Container sx={{ justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
        <Box sx={{ display: 'flex', marginBottom: '20px' }}>
          <img src={'/images/useradva.png'} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <Typography sx={{ paddingTop: '20px' }}>User Name </Typography>
        </Box>

        <Grid container spacing={2} alignItems="center" style={{ maxWidth: '400px' }}>
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
            <TextField
              label="Image URL"
              fullWidth
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddBusiness}>
              Add Business
            </Button>
          </Grid>
        </Grid>

   

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
          <Typography variant="h6">Total Points: {totalPoints}</Typography>
        </Box>
      </Box>
      <Typography sx={{fontSize:'30px', marginLeft:'40%', paddingTop:'7%'}}>
      My Businesses
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',padding: '7% 0' }}>
    
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <img
            src={'/images/useradva.png'}  
            alt="User Avatar"
            style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }}
          />
          <div>
            <h2>Name of Business</h2>
            <p>Username - Date</p>
          </div>
        </div>
        <p>Description of the business goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <img
            src={'/images/Rectangle 45.png'} 
            alt="Business Photo"
            style={{ width: '100%', height: 'auto', borderRadius: '5%', marginRight: '15px' }}
          />


        <div style={{ display: 'flex', alignItems: 'center', paddingTop: '15px' }}>
          <IconButton>
            <StarIcon />
          </IconButton>
          <span>4 Stars</span>

          <IconButton style={{ marginLeft: '15px' }}>
            <ChatBubbleIcon />
          </IconButton>
          <span>4 Comments</span>

          <IconButton style={{ marginLeft: '15px' }}>
            <ShareIcon />
          </IconButton>
          <span>2 Shares</span>
        </div>
      </Paper>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <img
            src={'/images/useradva.png'}  
            alt="User Avatar"
            style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }}
          />
          <div>
            <h2>Name of Business</h2>
            <p>Username - Date</p>
          </div>
        </div>
        <p>Description of the business goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <img
            src={'/images/Rectangle 45.png'} 
            alt="Business Photo"
            style={{ width: '100%', height: 'auto', borderRadius: '5%', marginRight: '15px' }}
          />


        <div style={{ display: 'flex', alignItems: 'center', paddingTop: '15px' }}>
          <IconButton>
            <StarIcon />
          </IconButton>
          <span>4 Stars</span>

          <IconButton style={{ marginLeft: '15px' }}>
            <ChatBubbleIcon />
          </IconButton>
          <span>4 Comments</span>

          <IconButton style={{ marginLeft: '15px' }}>
            <ShareIcon />
          </IconButton>
          <span>2 Shares</span>
        </div>
      </Paper>
    </div>
    </Container>
    </>
    </ApolloProvider>

  );
};

export default ProfilePage;
