import React from 'react'
// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/header1.css'

import {
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
  Button,
  Container,
  Row,
  Col,
  InputGroup
} from 'react-bootstrap'
import { TiShoppingCart} from 'react-icons/ti'
import { FaRegUser, FaHome } from 'react-icons/fa'
export default class Header1 extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="he">
        <Container className="navh1">
          <Row>
            <Col sm={2}>
              <h1 className="navh">eMart</h1>
            </Col>
            <Col sm={7}>
              <InputGroup className="mb-3 ">
                <FormControl placeholder="Search...." className="inpg" />
                <InputGroup.Append>
                  <Button variant="outline-secondary" className="btnSearch">
                    Search
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
            <Col sm={3}>
              <Row>
                <Col className="text-right iuser">
                  <FaRegUser />
                </Col>
                <Col className="tuser">
                  <a className="link1" href="#">
                    <h4 className="regis">SIGN IN</h4>
                  </a>
                  <a className="link1" href="/Register">
                    <h4 className="regis">REGISTER</h4>
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        </div>
        <Navbar expand="lg"  className="navbar1" sticky="top">
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="ttt"></div>
            <Nav className="mr-auto">
              <Nav.Link href="/" className="navbar2" active>
                <FaHome />
              </Nav.Link>
              <NavDropdown title="SHOP" id="basic-nav-dropdown">
                <NavDropdown.Item href="/CShop" className="navbar2">
                Create SHOP
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" className="navbar2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" className="navbar2">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4" className="navbar2">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="CATEGOLY" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1" className="navbar2">
                  Action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" className="navbar2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" className="navbar2">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4" className="navbar2">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#link" className="navbar2">
                PAYMENT
              </Nav.Link>
              <Nav.Link href="/Con1" className="navbar2">
                TRACKING
              </Nav.Link>
            </Nav>
            {/* <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
           
            <Row className="cartt1" >
              <Col className="carti"><TiShoppingCart/>
              </Col>
              <Col ><h4 class="h4_1"> Cart</h4> <h4 className="h4_2"> 0.00 THB</h4></Col>
            </Row>
           
            <div className="ttt"></div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
