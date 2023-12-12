// pages/index.js
import React from "react";
import { Button, Container } from "@mui/material";
import Navbar from "../navbar";

export default function HomePage() {
  return (
    <Container>
      <Navbar />
      <div>
        <h1>Welcome to My Next.js + Material-UI Project</h1>
        <Button variant="contained" color="primary">
          Click me
        </Button>
      </div>
    </Container>
  );
}
