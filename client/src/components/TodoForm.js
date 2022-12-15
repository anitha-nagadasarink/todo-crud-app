
import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from "axios";
import toast from "react-hot-toast";


const TodoForm = ({ fetchTodoData, BASE_URL }) => {

  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState("");
  const [isPriority, setIsPriority] = useState(false);


  const submitData = async () => {
    try {
      const data = {
        title: title,
        tasks: tasks.split(','),
        isPriority: isPriority
      };
      const res = await axios.post(`${BASE_URL}/createTodo`, data);

      if (!res.data.success) {
        toast.error("Todo or Tasks missed");
      } else {
        toast.success("Todo created successfully");
        fetchTodoData();
      }
    }
    catch (error) {

      if (!title && !tasks) {
        toast.error("Todo and Tasks are mandotory");
      } else {
        toast.error(error.response.data.message);
      }
    }

  }

  const handleIsPriority = () => {
    setIsPriority(!isPriority)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    submitData();
    setTitle("");
    setTasks("");
  }

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
            <Form.Check
              className="text-dark"
              type="checkbox"
              label="Is Priority?"
              id="isPriority"
              value={isPriority}
              onChange={handleIsPriority} />
          </Form.Group>
          <Button className="text-light"
            variant="info"
            type="submit"
          >
            Submit
          </Button>

        </Form>
      </Card.Body>

    </Card>

  );
};

export default TodoForm;