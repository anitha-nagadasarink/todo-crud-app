require("dotenv").config();

const TodoRoutes = require("./routes/TodoRouters");
const connectToDB = require("./config/database");
const express = require("express");
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectToDB();
// Middlewares
app.use("/", TodoRoutes);

module.exports = app;

