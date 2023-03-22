import React, { useState } from "react";
import axios from "axios";
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
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const handleButtonClick = async (e) => {
    e.preventDefault();
    if (name.length < 5 || name.length > 15) {
      setAlert({
        open: true,
        severity: "error",
        message: "Error: Name must be between 5 and 15 characters long.",
      });
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users?name=${name}`
        );
        if (response.data.data.users.length > 0) {
          setAlert({
            open: true,
            severity: "error",
            message:
              "Error: This name is already taken. Please choose a different name.",
          });
        } else {
          await axios.post("http://localhost:5000/api/v1/users", { name });
          setAlert({
            open: true,
            severity: "success",
            message: "Query processed successfully!",
          });
        }
        setName("");
      } catch (error) {
        setAlert({
          open: true,
          severity: "error",
          message: "Error: Failed to process query.",
        });
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  };

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  const handleResetButtonClick = () => {
    setName("");
    setAlert({ ...alert, open: false });
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
                id="join-textfield"
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
            open={alert.open}
            autoHideDuration={3000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <SnackbarContent
              style={{
                backgroundColor: alert.severity === "error" ? "red" : "green",
              }}
              message={alert.message}
            />
          </Snackbar>
        </Card>
      </div>
    </>
  );
};

export default Join;
