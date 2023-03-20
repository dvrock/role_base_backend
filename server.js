const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const mongoErrors = require("mongoose-mongodb-errors");
mongoose.Promise = global.Promise;
mongoose.plugin(mongoErrors);
let url = 3002 || 3001 || 3000 || 3003;
const route = require("./routes/route");
app.use(express.json());
app.use(cors());
app.use("/", route);
app.use("*", (req, res, next) => {
  req.status = 404;
  const error = new Error("Route not found");
  res.json({
    message: error.message,
    stack: error.stack,
  });
  next();
});

mongoose
  .connect(
    "mongodb+srv://Test:1234@cluster0.xaatijs.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("db connection sucessfull");
  });
app.listen("3002", () => {
  console.log("connected");
});
