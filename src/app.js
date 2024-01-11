import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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
app.use(cookieParser());

// importing routes
import userRouter from "./routes/user.routes.js";
import contactRouter from "./routes/contact.routes.js";

app.use("/api/v1/user/", userRouter);
// secure routes
app.use("/api/v1/contact/", contactRouter);

export { app };
