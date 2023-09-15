const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
require("dotenv").config({ path: "./dev.env" });

app.use(cors());

app.use(express.json());

const UserModel = require("./models/Users");

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/user", async (req, res) => {
  try {
    console.log("Hello");
    const Users = await UserModel.find();
    res.status(200).json(Users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal server error");
  }
});

app.use("/", (req, res) => {
  res.send("wecome to Home page");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
