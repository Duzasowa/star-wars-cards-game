import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Card, Grid, useMediaQuery } from "@mui/material";
import Navbar from "../components/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { cardStyle } from "../assets/stylesMUI/styles";
import "./CartsList.css";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const CartsList = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Navbar />
      <div className="bg-cartsList">
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Box sx={{ p: 2 }}>
              <Grid
                container
                spacing={2}
                sx={{ maxWidth: isSmallScreen ? "none" : "1200px" }}
              >
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      minWidth: "100%",
                      height: `${50 / 3}vw`,
                      maxHeight: "50vh",
                      maxWidth: isSmallScreen ? "none" : "100%",
                      fontSize: "16px",
                    }}
                  >
                    content for first card
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      minWidth: "100%",
                      height: `${50 / 3}vw`,
                      maxHeight: "50vh",
                      maxWidth: isSmallScreen ? "none" : "100%",
                      fontSize: "16px",
                    }}
                  >
                    content for second card
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      minWidth: "100%",
                      height: `${50 / 3}vw`,
                      maxHeight: "50vh",
                      maxWidth: isSmallScreen ? "none" : "100%",
                      fontSize: "16px",
                    }}
                  >
                    content for third card
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </ThemeProvider>
      </div>
    </>
  );
};

export default CartsList;
