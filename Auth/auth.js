const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

module.exports = {
  Authenticate: async (req, res, next) => {
    try {      
      console.log(req.headers)
        const verify = req.headers["authorization"];
        console.log(verify)
        if (!verify) return res.json("unauthorized user");
        const bearer = verify.split(" ");
        req.token = bearer[1];
        console.log("token:",bearer[1])
        const authData = await jwt.verify(req.token, "user");
        console.log("authData",authData)
        req.id = authData.id;
        next();                     
    } catch (err) {
      res.json({status:400});
    }
  },
};
