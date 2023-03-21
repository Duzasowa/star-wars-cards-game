import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

// Connect to database
mongoose
  .connect(DB, { useNewUrlParser: true })
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(`DB connection error: ${err.message}`));

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

// Handling a possible error
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled rejection! Shutting down the server...`);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
