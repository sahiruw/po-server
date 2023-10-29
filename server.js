const express = require("express");

const dotenv = require("dotenv").config()
const cookie = require("cookie-parser")
const {verifyToken} = require("./utils/auth/verifyToken")


const PORT = 5000
const eapp = express();

var corsOptions = {
    origin: "http://localhost:3000"
  };
  
const cors = require("cors");
eapp.use(cors());

eapp.use(cookie())
eapp.use(express.json())
eapp.use("/", verifyToken, require("./app"))
eapp.listen(process.env.PORT || PORT)