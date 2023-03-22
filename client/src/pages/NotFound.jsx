import React from "react";
import Navbar from "../components/Navbar";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "92vh",
    backgroundImage:
      "url('https://media.licdn.com/dms/image/C5612AQGN00aSnczzRg/article-inline_image-shrink_1500_2232/0/1520203381486?e=1684368000&v=beta&t=Gr6rTYW40HL6jt_5Q0QlY0jI19SHccIrH-bnSVMHuSY')", // замініть цей URL на URL своєї фотографії
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

const NotFound = () => {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Box className={classes.root}></Box>
    </>
  );
};

export default NotFound;
