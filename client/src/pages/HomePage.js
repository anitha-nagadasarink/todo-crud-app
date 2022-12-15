import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "../App.css";

import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { Toaster } from "react-hot-toast";

const HomePage = () => {

  const [todoData, setTodoData] = useState("");

  // const BASE_URL = "railwayDomain";
  const BASE_URL = "todo-crud-app.up.railway.app";

  const fetchTodoData = async () => {
    // const res = await axios.get(`${BASE_URL}/getTodos`);
    const res = await axios.get(`${BASE_URL}/getTodos`);
    setTodoData(res.data.todos);
  }


  useEffect(() => {
    fetchTodoData();
  })

  return (
    <section>
      <Container fluid className="todo-container">
        <Row>
          <Col xs={12} lg={4}>
            <TodoForm fetchTodoData={fetchTodoData} BASE_URL={BASE_URL} />
          </Col>
          <Col xs={12} lg={8}>
            <TodoList
              todoData={todoData}
              fetchTodoData={fetchTodoData}
              BASE_URL={BASE_URL} />
          </Col>
        </Row>
      </Container>

      <Toaster />
    </section>
  )
}

export default HomePage;