const express = require("express");
const User = require("../models/UserModel");
const Examples = require("../UsersData.json");

const app = express();

app.post("/users", async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "User cannot be empty.",
    });
  }

  try {
    const user = new User(req.body);
    await user.save();
    return res.status(200).send(`Users added successfully!\n" ${user}`);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/examples", async (req, res) => {
  User.insertMany(Examples)
    .then(() => {
      res.status(200).send("Examples added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("account/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
    console.log("User logged in successfully");
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
