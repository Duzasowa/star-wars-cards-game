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
import { cardStyle, textFieldStyle } from "../assets/stylesMUI/styles";
import Navbar from "../components/Navbar";
import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleButtonClick = async (e) => {
    e.preventDefault();
    if (name.length < 5 || name.length > 15) {
      setAlertSeverity("error");
      setAlertMessage("Error: Name must be between 5 and 15 characters long.");
    } else {
      try {
        await fetch("http://localhost:5000/api/v1/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
        setAlertSeverity("success");
        setAlertMessage("Query processed successfully!");
      } catch (error) {
        console.error(error);
        setAlertSeverity("error");
        setAlertMessage("Error: Failed to process query.");
      }
      setName("");
    }
    setAlertOpen(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // заборонити Enter в полі
      event.target.blur(); // зняти фокус з поля
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false); // hide the alert
  };

  const handleResetButtonClick = () => {
    setName("");
    setAlertOpen(false); // hide the alert
  };

  return (
    <>
      <Navbar />
      <div className="bg-join">
        <Card sx={cardStyle}>
          <List aria-label="mailbox folders">
            <Box sx={{ width: 200 }}>
              <TextField
                onKeyPress={handleKeyPress}
                sx={textFieldStyle}
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
              <Button
                onClick={handleResetButtonClick}
                sx={{ width: "100px" }}
                variant="outlined"
              >
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
              style={{
                backgroundColor: alertSeverity === "error" ? "red" : "green",
              }}
              message={alertMessage}
            />
          </Snackbar>
        </Card>
      </div>
    </>
  );
};

export default Join;
