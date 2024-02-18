'use client';
import React from "react";
import Link from 'next/link';
import { Container, Grid,Typography, Button, Box  } from "@mui/material";
import Navbar from "../navbar";

export default function HomePage() {
  return (
    <><Navbar />
    <Container sx={{ position: 'relative', height: '91vh', width: '100%' }}>
      <img
        src="/images/adv.jpg"
        alt="Your Image"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Container sx={{ margin: '0 42px', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid container spacing={45}>
          <Grid item xs={1}>
            <Container sx={{ width: 310, height: 282, backgroundColor: 'grey', marginTop: '388px', borderRadius:'5%' }}>
            </Container>
          </Grid>
          <Grid item xs={1}>
            <Container sx={{ width: 310, height: 306, backgroundColor: 'grey', marginTop: '365px', borderRadius:'5%' }}>
            <img
            src={'/images/Rectangle 45.png'} 
            alt="Business"
            style={{ width: '100%', height: '80%', borderRadius: '5%', }}
          />   
          <Container>
            <Typography sx={{color:'white'}}> Featured</Typography>
          <Box sx={{width:'25%',backgroundColor:'white',marginLeft:'73%',marginTop:'-10%', borderRadius:'10%'}}>
          <Link href="/pages/business">
                    <Button color='primary' sx={{paddingLeft:'0%'}}>
            Visit
          </Button>
          </Link>
          </Box>
          </Container>
                   </Container>
          </Grid>
          <Grid item xs={1}>
            <Container sx={{ width: 310, height: 330, backgroundColor: 'grey', marginTop: '340px', borderRadius:'5%' }}>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Container>
    </>
  );
}
