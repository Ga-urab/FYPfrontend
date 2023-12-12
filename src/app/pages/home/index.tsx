// pages/index.js
import React from "react";
import { Container, Grid } from "@mui/material";
import Navbar from "../navbar";

export default function HomePage() {
  return (
    <Container sx={{ position: 'relative' }}>
      <Navbar />
      <Container>
        <img src="/images/Picture23.png" alt="Your Image" style={{ width: '100%', marginTop: '-64px', height: '100%' }} />
      </Container>
      <Container sx={{margin:'0 42px'}}>
        <Grid container spacing={45}>
          {/* Three containers in a single row */}
          <Grid item xs={1}>
            <Container sx={{ width: 300, height: 282, backgroundColor: 'grey', marginTop: '-286px' }}>
              {/* Content for the first container */}
            </Container>
          </Grid>
          <Grid item xs={1}>
            <Container sx={{ width: 300, height: 330, backgroundColor: 'grey', marginTop: '-334px' }}>
              {/* Content for the second container */}
            </Container>
          </Grid>
          <Grid item xs={1}>
            <Container sx={{ width: 300, height: 330, backgroundColor: 'grey', marginTop: '-380px' }}>
              {/* Content for the third container */}
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
