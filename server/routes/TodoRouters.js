const express = require("express");
const {
  home,
  createTodo,
  getTodos,
  searchTodo,
  sortTodos,
  editTodo,
  deleteTodo
} = require("../controllers/TodoController");
const router = express.Router();


router.get("/", home);


// User Routes
// router.post("/registerUser", registerUser);
// router.post("/login", login);
// router.get("/dashboard", dashboard);

// Todo Routes
router.post("/createTodo", createTodo);
router.get("/getTodos", getTodos);
router.get("/searchTodo", searchTodo);
router.get("/sortTodos", sortTodos);
router.put("/editTodo/:id", editTodo);
router.delete("/deleteTodo/:id", deleteTodo);
// router.get("/getUser", getUser);
// router.put("/editUser/:id", editUser);
// router.delete("/deleteUser/:id", deleteUser);

module.exports = router;