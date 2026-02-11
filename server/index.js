const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// test route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend running");
});

// routes
const LoginRoute = require("./routes/LoginRoute");
const RegisterRoute = require("./routes/RegisterRoute");
const RecipeRoute = require("./routes/RecipeRoute");
const ForgotPassword = require("./routes/forgotPassword");

app.use("/auth", LoginRoute);
app.use("/auth", RegisterRoute);
app.use("/auth", RecipeRoute);
app.use("/auth", ForgotPassword);

// DO NOT hardcode port on Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
