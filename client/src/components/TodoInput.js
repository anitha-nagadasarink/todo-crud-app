import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { FaRegEdit, FaRegTrashAlt, FaSearch } from "react-icons/fa";


const TodoInput = () => {
  return (
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
  )
}


export default TodoInput;