import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("Backend running");
});

const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();

app.use(express.json());
app.use(cors());

const config = require("../db/config");
const Home = require("../controllers/controller");
const LoginRoute = require("../routes/LoginRoute");
const RegisterRoute = require("../routes/RegisterRoute");
const verifyToken = require("../Middleware/middleware");
const RecipeRoute = require("../routes/RecipeRoute");
const ForgotPassword = require("../routes/forgotPassword");

app.use("/auth", LoginRoute);
app.use("/auth", RegisterRoute);
app.use("/auth", RecipeRoute);
app.use("/auth", router);
app.use("/auth", ForgotPassword);

router.get("/", verifyToken, Home.Home);

module.exports = router;

if (config) {
  app.listen(process.env.PORT, () => {
    console.log(`Server Started on port ${process.env.PORT}`);
  });
}
export default app;
