require("dotenv").config();

const TodoRoutes = require("./routes/TodoRouters");
const express = require("express");
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middlewares
app.use("/", TodoRoutes);


module.exports = app;

