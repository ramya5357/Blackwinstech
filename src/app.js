import express from "express";
import cors from "cors";

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));

// importing routes
// import userRouter from "./routes/user.routes.js ";
import contactRouter from "./routes/contact.routes.js";

// routes declaration
// app.use("/api/v1/user/", userRouter);

// secure routes declaration
app.use("/api/v1/user/", contactRouter);

export { app };
