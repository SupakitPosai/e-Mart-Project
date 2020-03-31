import React, { Component } from 'react'
import {
    Container,
    Row,
    Col,
    Card,
    Button, InputGroup, FormControl
} from 'react-bootstrap'
import { FaFacebookSquare, FaGooglePlus, FaYoutube } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Cookies from 'universal-cookie';
import '../css/footer.css'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
const cookies = new Cookies();
export default class Footer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            searchtxt:''
        }
    }
    chan(e){
        this.setState({searchtxt:e.target.value})
    }
    render() {
        var dd ="";
        if (cookies.get('Language') == undefined) {
            dd= 'ค้นหา....'
        }
        if (cookies.get('Language') == 'th') {
            dd= 'ค้นหา....'
        }
        if (cookies.get('Language') == 'en') {
            dd= 'Search....'
        }
        return   (
            <div>
                <div className="foot1" >
                    <Container>
                        <Row>
                            <Col sm={2}></Col>
                            <Col sm={4} className="ff1">
                                <Row className="f">
                                    <Col >
                                        <h1>EMART</h1>
                                    </Col>
                                </Row>
                                <Row><Col>
                                    <Link to="/Footer/AboutUs">
                                        <h4>
                                            {cookies.get('Language') == undefined && 'เกี่ยวกับเรา'}
                                            {cookies.get('Language') == 'th' && 'เกี่ยวกับเรา'}
                                            {cookies.get('Language') == 'en' && 'About us'}
                                        </h4>
                                    </Link>
                                </Col>
                                    <Col>
                                        <Link to="/Footer/ContactUs">
                                            <h4>
                                                {cookies.get('Language') == undefined && 'ติดต่อเรา'}
                                                {cookies.get('Language') == 'th' && 'ติดต่อเรา'}
                                                {cookies.get('Language') == 'en' && 'Contact us'}
                                            </h4>
                                        </Link>
                                    </Col>
                                    <Col>
                                        <Link to="/Footer/Policy">
                                            <h4>
                                                {cookies.get('Language') == undefined && 'นโยบาย'}
                                                {cookies.get('Language') == 'th' && 'นโยบาย'}
                                                {cookies.get('Language') == 'en' && 'Policy'}
                                            </h4>
                                        </Link>
                                    </Col>
                                </Row>

                            </Col>

                            <Col sm={4} className="ff2">

                                <Row>
                                    <Col>
                                        <InputGroup className="mb-3 ">
                                            <FormControl placeholder={dd} className="inpg" onChange={this.chan.bind(this)}/>
                                            <InputGroup.Append>
                                                <Button variant="outline-secondary" className="btnSearch" href={"/ShowProduct?s=" + this.state.searchtxt} >
                                                    {cookies.get('Language') == undefined && 'ค้นหา'}
                                                    {cookies.get('Language') == 'th' && 'ค้นหา'}
                                                    {cookies.get('Language') == 'en' && 'Search'}
                                                </Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <a href="https://www.facebook.com/">
                                            <FaFacebookSquare className="icon" />
                                        </a>
                                    </Col>
                                    <Col>
                                        <a href="https://www.google.com/">
                                            <FaGooglePlus className="icon" />
                                        </a>
                                    </Col>
                                    <Col>
                                        <a href="https://mail.google.com/mail/u/0/#inbox">
                                            <MdEmail className="icon" />
                                        </a>
                                    </Col>
                                    <Col>
                                        <a href="https://www.youtube.com/">
                                            <FaYoutube className="icon" />
                                        </a>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={2}></Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}
