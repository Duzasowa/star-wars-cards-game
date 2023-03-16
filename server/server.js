import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
