export const style = {
  width: "100%",
  color: "white",
};

export const iconStyle = {
  color: "#4B75E1",
};

export const cardStyle = {
  width: "30%",
  height: "60%",
  backgroundColor: "rgba(31,67,108, 0.7)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "20px",
};

export const listItemButton = {
  "&:hover": {
    backgroundColor: "#b69955", // change the background color on hover
  },
};

export const stylesMain = {
  containerLateral: {
    width: "33.3%",
    height: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    width: "70%",
    height: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "10px",
  },
  cardText: {
    width: "90%",
    height: "70%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  gameContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
};

// JOIN.jsx
export const textFieldStyle = {
  "& .MuiFilledInput-root": {
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#b69955",
    },
    "&.Mui-focused": {
      backgroundColor: "white",
    },
  },
};

// CARTLIST.jsx
export const Container = {
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  padding: "20px",
};

export const CardContainer = {
  backgroundColor: "white",
  maxWidth: "300px",
  margin: "20px",
  borderRadius: "10px",
  height: "90%",
};

export const CardContentContainer = {
  padding: 0,
  textAlign: "center",
  textTransform: "uppercase",
  fontWeight: "bold",
};
