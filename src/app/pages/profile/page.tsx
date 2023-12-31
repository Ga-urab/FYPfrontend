'use client';
import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import Navbar from '../navbar';
import StarIcon from '@mui/icons-material/Star';

const ProfilePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [totalPoints, setTotalPoints] = useState(150);

  const handleAddBusiness = () => {
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Image:', image);
  };

  return (
    <>
    <Navbar />
    <Container sx={{justifyContent:'center'}}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop:'5%' }}>
      <Box sx={{ display: 'flex', marginBottom: '20px' }}>
        <img src={'/images/useradva.png'}  alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        <Typography sx={{paddingTop:'20px'}}>User Name </Typography>
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
  );
};

export default ProfilePage;
