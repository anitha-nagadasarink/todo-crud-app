import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';




const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const pageRedirect = useNavigate();

  // Store Date to Database
  const submitUserRegistration = async () => {
    try {
      const UseData = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password

      }
      const BASE_URL = "todo-crud-app.up.railway.app";
      const res = await axios.post(`${BASE_URL}/registerUser`, UseData);

      if (!res.data.success) {
        toast.error("Enter all Data")
      } else {
        toast.success(`User Resigtered Successfully!`);
        pageRedirect("/login");
      }
    }
    catch (error) {
      if (!firstName && !email && !password) {
        toast.error("Firstname, Email and Password is mandatory!");
      } else {
        toast.error(error.respose.data.message);
      }
    }
  }

  const handleRegisteration = (e) => {
    e.preventDefault();
    submitUserRegistration();
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }

  return (
    <section className='pt-5 info-gradient todo-container'>

      <h1 className='text-light text-center mb-4'>SignUp</h1>

      <div className="form-container mx-auto">
        <Container>
          <Form onSubmit={handleRegisteration} className="py-5 px-3 bg-white">
            <Row className="mb-2">
              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicFirstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicLastename">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="info" type="submit" className='p-2 mt-3 text-white text-center mx-auto w-50 d-block'>
              Submit
            </Button>
          </Form>

        </Container>
      </div>
      <Toaster />
    </section>
  )
}

export default SignUpPage;

