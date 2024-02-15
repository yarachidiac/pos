import React from "react";
import { Box, Container, Grid } from "@mui/material";

const Section = () => {
  return (
    <Box sx={{display:"flex", height: "85%", width: "100%", justifyContent: "center", alignItems: "center", overflow:"auto" }}>
      
        <Grid container spacing={2} justifyContent="center" height="100%" width="90%" alignContent="center">
          {[...Array(4).keys()].map((index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Box
                width="100%"
                paddingTop="100%" // 1:1 aspect ratio (square)
                bgcolor="white"
              />
            </Grid>
          ))}
        </Grid>
    </Box>
  );
};

export default Section;
