const express = require("express");

const dotenv = require("dotenv").config()
// const {db, store} = require('./firebase');
const cookie = require("cookie-parser")

const PORT = 5000
const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
  };
  
const cors = require("cors");
app.use(cors());

app.use(cookie())
app.use(express.json())
app.use("/", require("./app"))
app.listen(process.env.PORT || PORT)