require("dotenv").config();

const TodoRoutes = require("./routes/TodoRouters");
const connectToDB = require("./config/database");
const express = require("express");
var cookieParser = require('cookie-parser')
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

connectToDB();
// Middlewares
app.use("/", TodoRoutes);

module.exports = app;

