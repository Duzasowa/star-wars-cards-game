import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { style, iconStyle, cardStyle } from "../assets/stylesMUI/styles";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PublicIcon from "@mui/icons-material/Public";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import FestivalIcon from "@mui/icons-material/Festival";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import "./Home.css";

const Home = () => {
  const [numUsers, setNumUser] = useState([0]);

  useEffect(() => {
    const loadUsersData = async () => {
      return await axios
        .get(`http://localhost:5000/api/v1/users`)
        .then((response) => setNumUser(response.data))
        .catch((err) => err);
    };
    loadUsersData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-home">
        <Card style={cardStyle}>
          <List style={style} aria-label="mailbox folders">
            <ListItemButton sx={{ "&:hover": { backgroundColor: "#b69955" } }}>
              <PublicIcon style={iconStyle} />
              <ListItemText
                sx={{ marginLeft: 2 }}
                primary="Global matchmaking"
              />
            </ListItemButton>
            <Divider />
            <ListItemButton
              sx={{ "&:hover": { backgroundColor: "#b69955" } }}
              divider
            >
              <ShuffleIcon style={iconStyle} />
              <ListItemText
                sx={{ marginLeft: 2 }}
                primary="Casual constructed"
              />
            </ListItemButton>
            <Link to={`/joinToEmpireArmy`} className="offDecorationLine">
              <ListItemButton
                sx={{ "&:hover": { backgroundColor: "#b69955" } }}
              >
                <FestivalIcon style={iconStyle} />
                <ListItemText
                  sx={{ marginLeft: 2 }}
                  primary="Join the Galactic Empire"
                />
              </ListItemButton>
            </Link>
            <Divider light />
            <ListItemButton sx={{ "&:hover": { backgroundColor: "#b69955" } }}>
              <NewspaperIcon style={iconStyle} />
              <ListItemText sx={{ marginLeft: 2 }} primary="News" />
            </ListItemButton>
            <ListItemButton sx={{ "&:hover": { backgroundColor: "#b69955" } }}>
              <PeopleAltIcon style={iconStyle} />
              <ListItemText
                sx={{ marginLeft: 2 }}
                primary={`Players: ${numUsers.result}`}
              />
            </ListItemButton>
            <ListItemButton sx={{ "&:hover": { backgroundColor: "#b69955" } }}>
              <LocalFireDepartmentIcon style={iconStyle} />
              <ListItemText sx={{ marginLeft: 2 }} primary="Find next match" />
            </ListItemButton>
          </List>
        </Card>
      </div>
    </>
  );
};

export default Home;
