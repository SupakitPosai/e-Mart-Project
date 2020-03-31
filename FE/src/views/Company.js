import React, { Component } from 'react';
import user from '../img/user1.jpg';
// import React from 'react' 
import 'bootstrap/dist/css/bootstrap.min.css'
// import '../css/App.css';
// import {Navbar ,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap';
 
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col, Image, Nav, Card, Button } from 'react-bootstrap';

class Company extends Component {

  render() {
    return (
      <div>


        <Container className="text-center">
          <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item >
              <Nav.Link ><Link to="/CShop">บุคคล</Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link active > <Link to="/CShop/company">นิติบุคคล</Link></Nav.Link>
            </Nav.Item>

          </Nav>
          <Card style={{ width: 700 }}>
            <h1>Create Shop company</h1>
            <hr />
            <input></input>
            <Button></Button>

          </Card>


        </Container>

      </div>
    )
  }
}
export default Company
