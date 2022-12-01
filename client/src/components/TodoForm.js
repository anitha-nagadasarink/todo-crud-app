// Om Ganapathi Siddhi Buddhi
// OMshakthiamma Shivappa
// Vishnu Lakshmi
// Brahama Saraswathi
// Dakshinamurthy Haygriva
// Sri Venkateshwara Sri Vidya Vijaya Gnana Dhyrya Aurogya Lakshmi devi


import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from "axios";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TodoForm = () => {

  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState("");


  const submitData = async () => {
    const data = {
      title: title,
      tasks: tasks.split(',')
    };
    const res = await axios.post("/createTodo", data);
    console.log(res);

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    submitData();

    setTitle("");
    setTasks("");
  }
  const showToastInsert = () => {
    toast.success('Todo Inserted Successfullt!', {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-dark">Create Todo</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Enter Todo"
              className="mb-4"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <Form.Control
              type="text"
              placeholder="Enter Tasks"
              value={tasks}
              onChange={(event) => setTasks(event.target.value)}
            />
            <Form.Text className="text-muted">
              Enter the tasks by seperating the comma "(,)"
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button
            variant="info"
            type="submit"
            onClick={showToastInsert}>
            Submit
          </Button>
          <ToastContainer />
        </Form>
      </Card.Body>
    </Card>

  );
};

export default TodoForm;