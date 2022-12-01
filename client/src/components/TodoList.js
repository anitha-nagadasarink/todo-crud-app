import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";

const TodoList = () => {

  const [todoData, setTodoData] = useState(null);



  const fetchTodoData = async () => {
    const resp = await axios.get("/getTodos");
    console.log(resp);

    if (resp.data.todos.length > 0) {
      setTodoData(resp.data.todos);
    }
  }

  useEffect(() => {
    fetchTodoData();
  }, [todoData]);


  // Handle

  const handleEdit = async (todoId) => {
    const newTitle = prompt("Enter new Todo");
    const newTaks = prompt("Enter new tasks");


    if (!newTitle || !newTaks) {
      alert("New Todo and Title required");
    }

    const resp = await axios.put(`/editTodo/${todoId}`, {
      title: newTitle,
      tasks: newTaks
    });
    console.log(resp);
  }

  // Handle Delete
  const handleDelete = async (todoId) => {
    const resp = await axios.delete(`/deleteTodo/${todoId}`);
    console.log(resp);
  }




  return (
    <div>
      <Accordion defaultActiveKey="0" className="todo-list-container">
        {todoData && todoData.map((todo, i) => (
          <Accordion.Item eventKey={`${i}`}>
            <div className="todo-icon-container">

              <button className="todo-icon"
                onClick={() => handleEdit(todo._id)}>
                <FaRegEdit className="text-primary" />
              </button>

              <button className="todo-icon"
                onClick={() => handleDelete(todo._id)}>
                <FaRegTrashAlt className="text-danger " />
              </button>
            </div>
            <Accordion.Header>
              <h6>{i + 1}. {todo.title}
                <span className="tasks-number">{todo.tasks.length}</span>
              </h6>
            </Accordion.Header>
            <Accordion.Body>
              {todo.tasks}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default TodoList;