const TodoDB = require("../models/TodoSchema");
const UserDB = require("../models/UserSchema");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// const auth = require("../middleware/auth")

const mongoose = require("mongoose");

exports.home = (req, res) => {
  res.send("Hello Adavanced Todo App");
};


exports.registerUser = async (req, res) => {
  try {
    // Collect All information from User
    const { firstname, lastname, email, password } = req.body;

    // Validate the data

    if (!(email && password && firstname && lastname)) {
      throw new Error("All fileds are required");
    }

    // Check if the user exits in database
    const exitingUser = await UserDB.findOne({ email });
    if (exitingUser) {
      throw new Error(`${exitingUser} USer name alredy exits in database`);
    }

    // Encrypt the password
    const newEncryptedPassword = await bcrypt.hash(password, 10);

    // Create new entry in database
    const userdb = await UserDB.create({
      firstname,
      lastname,
      email,
      password: newEncryptedPassword
    });

    // Create a token and send it to User

    const token = jwt.sign({
      id: userdb._id, email
    }, "shhhh", { expiresIn: "2h" });

    userdb.token = token;
    // Avoid the tp display in password
    userdb.password = undefined

    res.status(200).json({
      success: true,
      message: "User registered Successfully",
      userdb
    })

  }
  catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
};

exports.login = async (req, res) => {
  try {
    // Getting information from User
    const { email, password } = req.body;

    // Validate the data

    if (!(email && password)) {
      throw new Error("Email and password is required");
    }

    // Check user in database
    const userdb = await UserDB.findOne({ email });

    // Macth database
    if (userdb && (await bcrypt.compare(password, userdb.password))) {
      const token = jwt.sign({ i: userdb._id, email }, "shhhh", { expiresIn: "2h" })

      userdb.password = undefined
      userdb.token = token

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true
      }
      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        userdb
      })
    }
  }
  catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `Error is login ${error.message}`
    })
  }
};


// exports.dashboard = auth, (req, res) => {
//   res.send('Welcome to dashboard')
// }

exports.createTodo = async (req, res) => {
  try {
    const { title, tasks, isPriority } = req.body;
    console.log("Todo", title, tasks, isPriority);

    const todobj = {};

    if (!title) {
      throw new Error("Title required to create todo")
    }

    Object.defineProperty(todobj, "title", {
      value: title,
      enumerable: true
    })

    Object.defineProperty(todobj, "tasks", {
      value: tasks,
      enumerable: true
    })


    if (isPriority === true || isPriority === false) {
      Object.defineProperty(todobj, "isPriority", {
        value: isPriority,
        enumerable: true
      })
    }
    const todo = await TodoDB.create(todobj);
    await todo.save();

    console.log(todo.createdAt);
    res.status(200).json({
      success: true,
      message: "Todo and Task successfully installed",
      todobj
    })
  }
  catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `Error in Inseting the Todo into Database ${error.message}`
    })
  }
};


exports.getTodos = async (req, res) => {
  try {
    const todos = await TodoDB.find();
    res.status(200).json({
      success: true,
      message: "Successfully fetched the data",
      todos
    })
  }
  catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await TodoDB.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: `Successfully deleted`,
      todo
    })
  }
  catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
};

// Edit Functionality

exports.editTodo = async (req, res) => {
  try {
    const todo = await TodoDB.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Todo successfully updated",
      todo
    })
  }
  catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `Error in edit ${error.message}`
    })
  }
}

exports.searchTodo = async (req, res) => {
  try {
    const searchTodo = req.query.title;

    // Check if Todo is empty
    if (!searchTodo) {
      throw new Error("Todo required to search Todo");
    }

    // Checking the whether searchTodo is string are not
    if (typeof searchTodo !== "string") {
      throw new Error("Searching Todo should be String");
    }

    //  Searching todo based on title
    const todos = await TodoDB.find({ title: new RegExp(searchTodo, 'i') });
    res.status(200).json({
      success: true,
      message: `Searched Todo ${searchTodo}`,
      searchTodo, todos
    });

  }
  catch (error) {
    res.status(400).json({
      success: false,
      message: `Error in feching Erros ${error.message}`
    });
  }
};

exports.sortTodos = async (req, res) => {
  try {

    const { ascendingSort } = await TodoDB.find();

    const sort = { createdAt: -1 };
    const todos = await TodoDB.find().sort(sort);

    res.status(200).json({
      success: true,
      todos
    })
  }
  catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
};