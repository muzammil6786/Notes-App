const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  const { username, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 8, async (err, hash) => {
        if (hash) {
          const user = new UserModel({ username, email, pass:hash,});
          await user.save();
          res.send({ msg: "New new user has been register "});
        } else {
          res.send({ msg: err });
        }
      })
    }
    catch (err) {
      res.send({ msg: err });
    }
  })

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    bcrypt.compare(pass, user.pass, (err, result) => {
      if (result) {
        res.status(200).send({
          msg: "Login Sucessful...!",user,
          token: jwt.sign({ userID: user._id,author:user.username}, "masai"),
        });
      } else {
        res.status(200).send({ msg: "User does not exist , Please register" });
      }
    });
  } catch (err) {
    res.send({ Error: err });
  }
});

module.exports = {
  userRouter,
};
