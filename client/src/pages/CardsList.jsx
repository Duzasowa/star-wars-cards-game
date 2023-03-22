import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { CardMedia } from "@mui/material";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./CardsList.css";
import { GiCrossedSwords, GiHealthNormal } from "react-icons/gi";

const Container = styled(Box)({
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  padding: "20px",
});

export const CardContainer = styled(Card)({
  backgroundColor: "white",
  maxWidth: "300px",
  margin: "20px",
  borderRadius: "10px",
  height: "90%",
});

export const CardContentContainer = styled(CardContent)({
  padding: 0,
  textAlign: "center",
  textTransform: "uppercase",
  fontWeight: "bold",
});

const CardsList = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [hasMoreCards, setHasMoreCards] = useState(true);

  // Downloading all Cards
  useEffect(() => {
    const loadCardsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/cards?page=${page}&limit=${pageSize}`
        );
        if (response.data.cards.length === 0) {
          setHasMoreCards(false);
        }
        setCards(response.data.cards);
      } catch (err) {
        console.log(err);
      }
    };
    loadCardsData();
  }, [page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRestart = () => {
    setHasMoreCards(true);
    setPage(1);
  };

  return (
    <>
      <Navbar />
      <Box height="100%">
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Grid container spacing={2} justifyContent="center">
            {cards.map((card, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <CardContainer
                  className={`card ${
                    card.rarity === "common"
                      ? "card-common"
                      : card.rarity === "rare"
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
                      {card.name}
                    </Box>
                    <CardMedia
                      component="img"
                      image={card.imageCover}
                      alt={card.name}
                    />
                    <Box
                      sx={{ display: "flex", justifyContent: "space-evenly" }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <GiCrossedSwords size={25} />
                        <Box sx={{ ml: 1, fontSize: 20 }}>{card.damage}</Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <GiHealthNormal size={25} />
                        <Box sx={{ ml: 1, fontSize: 20 }}>{card.health}</Box>
                      </Box>
                    </Box>
                  </CardContentContainer>
                </CardContainer>
              </Grid>
            ))}
          </Grid>
          {hasMoreCards && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 3,
              }}
            >
              <Pagination
                sx={{
                  "& .MuiPaginationItem-page.Mui-selected": {
                    color: "white",
                    fontWeight: "bold",
                  },
                  "& .MuiPaginationItem-page:not(.Mui-selected)": {
                    color: "#2f88ff",
                  },
                  background: "none !important",
                }}
                count={5}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          )}
          {!hasMoreCards && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Typography sx={{ color: "white", fontWeight: "bold" }}>
                No more cards
              </Typography>
              <Button onClick={handleRestart} variant="outlined">
                Restart
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default CardsList;
