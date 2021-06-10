
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../STYLES/navbar.css';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import '../../STYLES/navbar.css';
// import SIGNUP_POPUP from '../Authentication/SignUp.jsx';
// import Login from '../Authentication/Login.jsx';
// import app from "../../Firebase/Firebase.js";



const Navbar_top = () => {


    let history = useHistory();
    const location = useLocation();
    const modify_url = location.pathname;



    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" style={{ padding: "1rem" }} >
                <Container /* style={{ margin: "0 20px" }} */ >
                    <LinkContainer to="/"><Navbar.Brand id="heading_nav" style={{ fontSize: "2.4rem" }}  >BLOGGING</Navbar.Brand></LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">

                            <LinkContainer to="/">
                                <Nav.Link className="navBig">HOME  </Nav.Link>
                            </LinkContainer>


                            <LinkContainer to="/blog">
                                <Nav.Link className="navBig">BLOG
                                </Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/contact">
                                <Nav.Link className="navBig">CONTACT US
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    )
}

export default Navbar_top;
