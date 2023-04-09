import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchUsers } from "../store";

export const useThunk = (thunk) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
};

const Home = () => {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);

  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  if (isLoadingUsers) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  if (loadingUsersError) {
    return <div style={{ color: "white" }}>Error loading data.</div>;
  }

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
                primary={`Players: ${data.result ? data.result : "Loading..."}`}
              />
            </ListItemButton>
            <Link to={`/game`} className="offDecorationLine">
              <ListItemButton
                sx={{ "&:hover": { backgroundColor: "#b69955" } }}
              >
                <LocalFireDepartmentIcon style={iconStyle} />
                <ListItemText
                  sx={{ marginLeft: 2 }}
                  primary="Find next match"
                />
              </ListItemButton>
            </Link>
          </List>
        </Card>
      </div>
    </>
  );
};

export default Home;
