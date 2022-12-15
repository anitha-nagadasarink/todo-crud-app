import React from "react";
import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <NavLink to={"/"} className="text-info text-decoration-none">Accomplisher</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="bg-info" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <NavLink to={"/signup"} className="text-info text-decoration-none">SingUp</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to={"/login"} className="text-info text-decoration-none">Login</NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // <header className="bg-light px-4 py-3">
    //   <h2 className='text-info'>Accomplisher</h2>
    //   <nav>
    //     <ul>
    //       <li>
    //         <NavLink to={"/"}>Home</NavLink>
    //       </li>
    //       <li>
    //         <NavLink to={"/Signup"}>SingUp</NavLink>
    //       </li>
    //       <li>
    //         <NavLink to={"/login"}>Login</NavLink>
    //       </li>
    //     </ul>
    //   </nav>
    // </header>
  );
};

export default Header;