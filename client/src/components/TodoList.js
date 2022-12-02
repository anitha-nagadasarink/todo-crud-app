import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';

import { FaRegEdit, FaRegTrashAlt, FaRegStar } from "react-icons/fa";
import { BsFillStarFill } from "react-icons/bs";

import axios from "axios";

import toast from "react-hot-toast";
import { useState } from 'react';

const TodoList = ({ todoData, fetchTodoData }) => {

  // Handle

  const handleEdit = async (todoId, todoTitle) => {
    try {
      const newTitle = prompt("Enter new Todo");
      const newTaks = prompt("Enter new tasks");

      if (!newTitle || !newTaks) {
        toast.error("Please enter Tasks and title");
      } else {
        const resp = await axios.put(`/editTodo/${todoId}`, {
          title: newTitle,
          tasks: newTaks
        });
        if (resp.data.success) {
          toast.success(`${todoTitle} Edited Successfully`);
          fetchTodoData();
        }
      }
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
  }
  const [sortedData, setSortedData] = useState("default");

  // console.log(todoData);

  const sortMethods = {
    default: { method: (a, b) => a.createdAt > b.createdAt ? -1 : 1 },
    ascending: { method: (a, b) => a.title > b.title ? 1 : -1 },
    descending: { method: (a, b) => a.title > b.title ? -1 : 1 },
    priority: { method: (a, b) => Number(b.isPriority) - Number(a.isPriority) },
    createdAt: {
      method: (a, b) => a.createdAt > b.createdAt ? -1 : 1
    }
  }
  // Handle Delete
  const handleDelete = async (todoId, todoTitle) => {
    try {
      // Confirmation tp delete Taks are not
      const deleteConfirm = window.confirm(`Are you Sure to Delete ${todoTitle}`);

      if (deleteConfirm) {
        const resp = await axios.delete(`/deleteTodo/${todoId}`);
        console.log(resp);
        if (resp.data.success) {
          toast.success(`${todoTitle} Successfully Deleted`);
          fetchTodoData();
        }
      }
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div>

      <Container>
        <Row className="mb-3">
          <Col xs={12} lg={9} className='sort-todo-list pb-6'>
            <h3 className='text-light mt-4'>Total Tasks: {todoData.length}</h3>
          </Col>
          <Col xs={12} lg={3} className='sort-todo-list pl-0'>
            <span className='text-light'>Sory By:</span>
            <Form.Select defaultValue={"default"} onChange={(e) => setSortedData(e.target.value)}>
              <option value="default">Default</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
              <option value="priority">Priority</option>
              <option value="createdAt">createdAt</option>
            </Form.Select>
          </Col>
        </Row>
      </Container>


      <Accordion defaultActiveKey="0" className="todo-list-container pt-10">
        {todoData && [...todoData].sort(sortMethods[sortedData].method).map((todo, i) => (
          <Accordion.Item eventKey={`${i}`}>
            <div className="todo-icon-container">

              <button className="todo-icon"
                onClick={() => handleEdit(todo._id, todo.title)}>
                <FaRegEdit className="text-info" />
              </button>

              <button className="todo-icon"
                onClick={() => handleDelete(todo._id, todo.title)}>
                <FaRegTrashAlt className="text-danger " />
              </button>
            </div>
            <Accordion.Header>
              <h6>
                <span className="todo-star info">
                  {todo.isPriority ? <BsFillStarFill /> : <FaRegStar />}
                </span>

                <span>  {i + 1}. {todo.title}</span>
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