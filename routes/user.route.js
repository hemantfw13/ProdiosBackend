const express = require("express");
const UserModel = require("../models/User.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send({ msg: "User registration failed", error: err.message });
      } else {
        const user = new UserModel({ name, email, password: hash });
        await user.save();
        res.send({ msg: "User registration successful" });
      }
    });
  } catch (e) {
    res.send({ msg: "User registration failed", error: e.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "Login Success",
            user: { name: user.name, email: user.email },
          });
        } else {
          res.status(400).send({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.status(400).send({ msg: "Wrong Credentials" });
    }
  } catch (e) {
    res.status(500).send({ msg: "Error during login", error: e.message });
  }
});




userRouter.get("/", async (req, res) => {
  const { name } = req.query;

  if (name) {
    const user = await UserModel.findOne({ name });
    return res.json({ exists: !!user, user });
  }

  const users = await UserModel.find({});
  res.json({ users });
});





module.exports = { userRouter };
