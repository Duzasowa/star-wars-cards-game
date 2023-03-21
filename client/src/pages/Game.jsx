import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardMedia, Select, MenuItem } from "@material-ui/core";
import "./Game.css";
import { Box, Button, Grid } from "@mui/material";
import { GiCrossedSwords, GiHealthNormal } from "react-icons/gi";
import { CardContainer, CardContentContainer } from "./CartsList";
import { stylesMain } from "../assets/stylesMUI/styles";

const Game = () => {
  const [users, setUsers] = useState([]);
  const [card, setCard] = useState([]);
  const [selectedUser1, setSelectedUser1] = useState(null);
  const [selectedUser2, setSelectedUser2] = useState(null);
  const [usersSelected, setUsersSelected] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const usersResponse = await axios.get(
          `http://localhost:5000/api/v1/users`
        );
        const cardsResponse = await axios.get(
          `http://localhost:5000/api/v1/cards/random`
        );
        setUsers(usersResponse.data.data.users);
        setCard(cardsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
    loadData();
  }, []);

  const handleUserChange1 = (event) => {
    setSelectedUser1((prev) => event.target.value);
    setUsersSelected(
      (prev) => selectedUser2 !== null && event.target.value !== null
    );
  };

  const handleUserChange2 = (event) => {
    setSelectedUser2((prev) => event.target.value);
    setUsersSelected(
      (prev) => selectedUser1 !== null && event.target.value !== null
    );
  };

  function restartPage() {
    window.location.reload();
  }

  const handleButtonClick = async () => {
    if (selectedUser1 && selectedUser2) {
      const [card1, card2] = card;
      const { damage: damage1 } = card1;
      const { damage: damage2 } = card2;
      let winner;
      if (damage1 === damage2) {
        alert("A draw! Play the fight again");
        restartPage();
        return;
      } else {
        winner = damage1 > damage2 ? selectedUser1 : selectedUser2;
      }
      alert(`${winner.name} wins!`);
      restartPage();
      winner.numberWins += 1; // increase the number of wins for the winner
      console.log(winner.numberWins);
      try {
        const response = await axios.patch(
          `http://localhost:5000/api/v1/users/${winner._id}`,
          { numberWins: winner.numberWins }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-game">
        <div className="container" style={stylesMain.gameContainer}>
          {/* CONTAINER LEFT */}
          <div style={stylesMain}>
            {usersSelected && card.length > 0 ? (
              <div>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <CardContainer
                    className={`card ${
                      card[0].rarity === "common"
                        ? "card-common"
                        : card[0].rarity === "rare"
                        ? "card-rare"
                        : "card-legendary"
                    }`}
                  >
                    <CardContentContainer>
                      <Box
                        sx={{
                          height: "30px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {card[0].name}
                      </Box>
                      <CardMedia
                        component="img"
                        image={card[0].imageCover}
                        alt={card[0].name}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <GiCrossedSwords size={25} />
                          <Box sx={{ ml: 1, fontSize: 20 }}>
                            {card[0].damage}
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <GiHealthNormal size={25} />
                          <Box sx={{ ml: 1, fontSize: 20 }}>
                            {card[0].health}
                          </Box>
                        </Box>
                      </Box>
                    </CardContentContainer>
                  </CardContainer>
                </Grid>
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "60%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Press the FIGHT button to start the game
              </div>
            )}
          </div>
          {/* CONTAINER CENTRAL */}
          <div
            className="container-central"
            style={{
              width: "33.3%",
              height: "100%",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "13%",
                backgroundColor: "white",
                borderRadius: "10px",
                marginTop: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {selectedUser1 ? (
                  <div style={{ padding: "10px" }}>
                    {selectedUser1.name} (Wins: {selectedUser1.numberWins})
                  </div>
                ) : (
                  <Select
                    value={selectedUser1}
                    onChange={handleUserChange1}
                    style={{ width: "30%" }}
                  >
                    <MenuItem value={null}>Select User 1</MenuItem>
                    {users
                      .filter((user) => user !== selectedUser2)
                      .map((user, index) => (
                        <MenuItem key={index} value={user}>
                          {user.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
                {selectedUser2 ? (
                  <div style={{ padding: "10px" }}>
                    {selectedUser2.name} (Wins: {selectedUser2.numberWins})
                  </div>
                ) : (
                  <Select
                    value={selectedUser2}
                    onChange={handleUserChange2}
                    style={{ width: "30%" }}
                  >
                    <MenuItem value={null}>Select User 2</MenuItem>
                    {users
                      .filter((user) => user !== selectedUser1)
                      .map((user, index) => (
                        <MenuItem key={index} value={user}>
                          {user.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {selectedUser1 && selectedUser2 ? (
                  <Button variant="contained" onClick={handleButtonClick}>
                    Fight
                  </Button>
                ) : (
                  <Button variant="contained" disabled>
                    Select players
                  </Button>
                )}
              </div>
            </div>
          </div>
          {/* CONTAINER RIGTH */}
          <div style={stylesMain}>
            {usersSelected && card.length > 0 ? (
              <div>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <CardContainer
                    className={`card ${
                      card[1].rarity === "common"
                        ? "card-common"
                        : card[1].rarity === "rare"
                        ? "card-rare"
                        : "card-legendary"
                    }`}
                  >
                    <CardContentContainer>
                      <Box
                        sx={{
                          height: "30px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {card[1].name}
                      </Box>
                      <CardMedia
                        component="img"
                        image={card[1].imageCover}
                        alt={card[1].name}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <GiCrossedSwords size={25} />
                          <Box sx={{ ml: 1, fontSize: 20 }}>
                            {card[1].damage}
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <GiHealthNormal size={25} />
                          <Box sx={{ ml: 1, fontSize: 20 }}>
                            {card[1].health}
                          </Box>
                        </Box>
                      </Box>
                    </CardContentContainer>
                  </CardContainer>
                </Grid>
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "60%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Press the FIGHT button to start the game
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
