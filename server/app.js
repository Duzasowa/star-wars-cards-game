import express from "express";
import userRouter from "./routes/userRouter.js";
import cardRouter from "./routes/cardRouter.js";
import AppError from "./utils/apiError.js";
import { errorController } from "./controllers/errorControllers.js";

const app = express();

app.use(express.json());

// CORS MIDDLEWARE
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/cards", cardRouter);

// ERROR HANDLING BY REQUEST
app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLING
app.use(errorController);

export default app;
