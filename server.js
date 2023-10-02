const express = require("express");

const dotenv = require("dotenv").config()
// const {db, store} = require('./firebase');
const cookie = require("cookie-parser")

const PORT = 5000
const app = express();


app.use(cookie())
app.use(express.json())
app.use("/api", require("./app"))
app.listen(PORT)