import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./App.css";

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Toaster } from "react-hot-toast";

function App() {

  const [todoData, setTodoData] = useState("");

  // const BASE_URL = "railwayDomain";

  const fetchTodoData = async () => {
    // const res = await axios.get(`${BASE_URL}/getTodos`);
    const res = await axios.get("/getTodos");
    setTodoData(res.data.todos);
  }


  useEffect(() => {
    fetchTodoData();
  })

  return (
    <main>
      <header className="bg-light px-4 py-3">
        <h2 className='text-info'>Accomplisher</h2>
      </header>

      <Container fluid className="todo-app">
        <Row>
          <Col xs={12} lg={4}>
            <TodoForm fetchTodoData={fetchTodoData} />
          </Col>
          <Col xs={12} lg={8}>
            <TodoList
              todoData={todoData}
              fetchTodoData={fetchTodoData} />
          </Col>
        </Row>
      </Container>

      <Toaster />
    </main>
  );
}

export default App;
