// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

import HomePage from './pages/Homepage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

import 'bootstrap/dist/css/bootstrap.min.css';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

import "./App.css";

// import TodoForm from './components/TodoForm';
// import TodoList from './components/TodoList';
// import { Toaster } from "react-hot-toast";


// Page Routes
import Header from './layouts/Header';
import { Routes, Route } from "react-router-dom";


function App() {

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </main>
  );
}

export default App;
