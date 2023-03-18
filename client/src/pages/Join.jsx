import React, { useState } from "react";
import {
  Button,
  Card,
  List,
  Snackbar,
  SnackbarContent,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { cardStyle } from "../assets/stylesMUI/styles";
import Navbar from "../components/Navbar";
import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const handleButtonClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setName("");
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false); // hide the alert
  };

  return (
    <>
      <Navbar />
      <div className="bg-join">
        <Card style={cardStyle}>
          <List aria-label="mailbox folders">
            <Box sx={{ width: 200 }}>
              <TextField
                sx={{
                  "& .MuiFilledInput-root": {
                    backgroundColor: "white", // change the background color
                    "&:hover": {
                      backgroundColor: "#b69955", // change the background color on hover
                    },
                    "&.Mui-focused": {
                      backgroundColor: "white", // change the background color when focused
                    },
                  },
                }}
                id="filled-textarea"
                label="Join the Empire!"
                variant="filled"
                multiline
                placeholder="Write your name cadet"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              <Button
                onClick={handleButtonClick}
                sx={{ width: "100px" }}
                variant="contained"
              >
                Join
              </Button>
              <Button sx={{ width: "100px" }} variant="outlined">
                Reset
              </Button>
            </Box>
          </List>
          <Snackbar
            open={alertOpen}
            autoHideDuration={3000} // set the duration for the alert
            onClose={handleAlertClose}
          >
            <SnackbarContent
              style={{ backgroundColor: "green" }} // set the background color
              message="Query processed successfully!"
            />
          </Snackbar>
        </Card>
      </div>
    </>
  );
};

export default Join;
