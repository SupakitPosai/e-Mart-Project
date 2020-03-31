import React, { Component } from 'react'
import RichTextEditor from 'react-rte';
import Navbar from '../components/navbar';
import parse from 'html-react-parser';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import ROOT_API from '../../config/API'
export default class AboutUs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: RichTextEditor.createEmptyValue(),
            defaultv: <></>,
            value_footer: ''
        }
    }

    componentWillMount() {
        axios.get(ROOT_API + "/api/getOrderStatus/fdsd26e23ge723d72dgd72").then(response => {
            this.setState({ defaultv: parse(response.data.value_footer) })

        }).catch(error => {});
    }
    onChange = (value) => {
        this.setState({ value });
      

        this.setState({ texx: parse(value.toString('html')), value_footer: value.toString('html') })
    }
    sub() {
        axios.put(ROOT_API + "/api/getOrderStatus/fdsd26e23ge723d72dgd72", this.state).then(response => {

            window.location.reload(false);
        }).catch(error => {});
    }
    render() {
        return (
            <div>
                <Row >
                    <Col sm={3} className="navb" ><Navbar /></Col>
                    <Col sm={9}><h1>About us</h1>

                        <Container style={{overflow:'auto',height:'500px'}} >
                            <Row>
                                <Col style={{fontSize:'22px'}}>
                                    <hr />
                                    {this.state.defaultv}
                                    <hr />
                                </Col>
                            </Row>
                            <Row>
                                <Col>

                                    <RichTextEditor
                                        value={this.state.value}
                                        onChange={this.onChange}
                                    />
                                    <br />
                                    <Button className='btnbuy' onClick={this.sub.bind(this)}>บันทึก</Button>
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    {this.state.texx}
                                </Col>
                            </Row>
                        </Container>

                    </Col>
                </Row>

            </div>
        )
    }
}
