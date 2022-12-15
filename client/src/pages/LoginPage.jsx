import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const pageRedirect = useNavigate();

  // Store Date to Database
  const submitUserLogin = async () => {
    try {
      const UserLogin = {
        email: email,
        password: password

      }
      const res = await axios.post("/login", UserLogin);

      if (!res.data.success) {
        toast.error("Enter All Data")
      } else {
        toast.success(`User Resigtered in Database!`);
        pageRedirect("/")
      }
    }
    catch (error) {
      if (!email && !password) {
        toast.error("Email and Password is mandatory!");
      } else {
        toast.error(error.respose.data.message);
      }
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    submitUserLogin();
    setEmail("");
    setPassword("");
  }

  return (
    <section className='pt-5 info-gradient todo-container'>

      <h1 className='text-light text-center mb-4'>Login</h1>
      <div className="form-container mx-auto">
        <Form onSubmit={handleLogin} className="py-5 px-3 bg-white">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="info" type="submit" className='text-white text-center mx-auto w-50 d-block'>
            Submit
          </Button>
        </Form>
      </div>
      <Toaster />
    </section>
  )
}

export default LoginPage;

