const TodoDB = require("../models/TodoSchema");

const mongoose = require("mongoose");

exports.home = (req, res) => {
  res.send("Hello Adavanced Todo App");
};

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