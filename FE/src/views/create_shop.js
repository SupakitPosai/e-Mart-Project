import React, { Component } from 'react';
import user from '../img/user1.jpg';
// import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
// import '../css/App.css';
// import {Navbar ,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap';

import Header1 from './header1.js'

import { Container, Row,Col,Image,Nav} from 'react-bootstrap';

 class CShop extends Component {
     
  render() {
    return (
      <div>
          <Header1 /> 
         
         <Container>
             <br/>
            <h1> CREATE SHOP</h1>
            <hr/>
            <Row>
         
                <Col>
                <Image src={user} roundedCircle />
                </Col>
                <Col>
                <input type="text" className="form-control" placeholder=""  />
                <textarea class="form-control" rows="5" id="comment"></textarea>
                </Col>
            </Row>
            <Nav variant="tabs" defaultActiveKey="/home">
  <Nav.Item>
    <Nav.Link href="#">หน้าร้าน</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-1">สินค้างทั้งหมด</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="disabled" disabled>
      วิธีจัดส่ง
    </Nav.Link>
  </Nav.Item>
</Nav>

            
         </Container>
         
      </div>
    )
  }
}
export default CShop
