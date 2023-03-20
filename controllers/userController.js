const User = require("../models/Register");

const bcrypt = require("bcrypt");
const express = require("express");

const app = express();
const jwt = require("jsonwebtoken");

module.exports = {
  Register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      console.log("request body:", req.body);
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: encryptedPassword,
        role,
      });

      const user = await newUser.save();
      res.json({
        message: "done",
        data: user,
        status: 201,
      });
    } catch (err) {
      res.json(err.message);
    }
  },
  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("consoling email and password:", email, password);
      if (email && password) {
        const getUsers = await User.findOne({ email });
        console.log("user", getUsers);
        if (getUsers) {
          const verify = await bcrypt.compare(password, getUsers.password);
          console.log("verification:", verify);
          if (verify) {
            const token = jwt.sign({ id: getUsers._id }, "user", {
              expiresIn: "90d",
            });
            res.json({
              status: "successfull",
              user: getUsers,
              token: token,
              status: 201,
            });
          } else {
            const error = new Error("Cannot get data from database");
            res.json({
              message:  error.message,
              stack: error.stack,
              status: 502,
            });
          }
        } else {
          const error = new Error("Fields are empty");
          res.json({
            message: error.message,
            stack: error.stack,
            status: 502,
          });
        }
      } else {
        res.json({
          status: 500,
          data: "bad request",
        });
      }
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      console.log("id", req.id);
      const getUser = await User.findById(req.id);
      res.json({
        user: getUser,
        status: 201,
      });
    } catch (err) {
      res.json({ message: err.message, status: 500 });
    }
  },
};
