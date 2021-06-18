
import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
// import { useLocation } from 'react-router-dom'
import '../../STYLES/navbar.css';
import logo from '../../images/logo-top.webp';



const Navbar_top = ({ USER }) => {

    let history = useHistory();
    // const location = useLocation();
    // const modify_url = location.pathname;


    useEffect(() => {
        if (Object.keys(USER).length !== 0) {
            history.push('/blogs');
        }
    }, [])




    useEffect(() => {

    }, [])



    return (
        <header>
            <Navbar sticky="top" bg="dark" variant="dark" expand="lg" style={{ padding: "1rem", zIndex: '2', width: '100%' }} id="navtop"  >
                <Container  >
                    <LinkContainer to="/"><Navbar.Brand id="heading_nav" style={{ fontSize: "2.4rem" }}  >BLOGGING</Navbar.Brand></LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">

                            {
                                USER && (Object.keys(USER).length !== 0) ?
                                    (
                                        <LinkContainer to="/blogs">
                                            <Nav.Link className="navBig">HOME  </Nav.Link>
                                        </LinkContainer>
                                    ) :
                                    (
                                        <LinkContainer to="/">
                                            <Nav.Link className="navBig">HOME  </Nav.Link>
                                        </LinkContainer>
                                    )
                            }

                            <LinkContainer to="/blogs">
                                <Nav.Link className="navBig">BLOGS
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




            {/*  <header className="header-area formobile-menu header--transparent black-logo-version ">
                    <div className="header-wrapper" id="header-wrapper">
                        <div className="header-left">
                            <div className="logo">
                                <a href="/index.html">
                                    <img src={logo} alt="TPP Logo" />
                                </a>
                            </div>
                        </div>

                        <div className="header">
                            <div className="mainmenunav d-lg-block">
                                <nav className="main-menu-navbar">
                                    <ul className="mainmenu">
                                        <li className="has-droupdown">
                                            <li>
                                                <a href="/index.html" style={{ color: "black" }}>HOME</a>

                                            </li>
                                            <li>
                                                <a href="/about.html" style={{ color: "black" }}>ABOUT US
                                                </a>

                                            </li>
                                            <li className="has-droupdown">
                                                <a style={{ color: "black", cursor: "pointer" }}>SERVICES&nbsp;<i
                                                    className="fas fa-caret-down"></i>
                                                </a>
                                                <ul className="submenu">
                                                    <li><a href="/services/branding-strategy-and-marketing-tools.html">Branding
                                                        Strategy & Marketing Tools</a></li>
                                                    <li><a href="/services/brand-collaterals.html">Brand Collaterals</a></li>
                                                    <li><a href="/services/digital-designs-and-telegenics.html">Digital Designs &
                                                        Telegenics</a></li>
                                                    <li><a href="/merchand.html">Merchandise & Misc</a> </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="/connect.html" style={{ color: "black" }}>CONNECT</a>
                                            </li>
                                        </li>
                                    </ul>
                                </nav>


                            </div>

                            <div className="humberger-menu d-block d-lg-none pl--20">
                                <span className="menutrigger text-white">
                                    <i data-feather="menu"></i>
                                </span>
                            </div>
                            <div className="close-menu d-block d-lg-none">
                                <span className="closeTrigger">
                                    <i data-feather="x"></i>
                                </span>
                            </div>

                        </div>
                    </div>
                </header> */}


        </header >
    )
}

export default Navbar_top;
