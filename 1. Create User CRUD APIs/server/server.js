import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
connectDb();
app.get("/", (req, res) => {
  res.json({
    message: "MERN Backend API is running",
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running");
});
