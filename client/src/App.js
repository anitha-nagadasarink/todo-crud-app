import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./App.css";

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <section className="todo-app">
      <Container fluid>
        <Row>
          <Col xs={12} lg={4}>
            <TodoForm />
          </Col>
          <Col xs={6} lg={8}>
            <TodoList />
          </Col>
        </Row>
      </Container>


    </section>
  );
}

export default App;
