import React, { Component } from 'react'
import Header from '../components/header';
import Footer from '../components/Footer';
import axios from 'axios';
import ROOT_API from '../config/API'
import parse from 'html-react-parser';
import {
    Carousel,
    Container,
    Row,
    Col,
    Card,
    Button, Image
  } from 'react-bootstrap'
export default class Footer_page extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pid: '',
            defaultv: <></>
        }
    }
    componentWillMount() {
        //(this.props.match.params.id)
        this.setState({ defaultv: <></>})
        this.setState({ pid: this.props.match.params.id })
        axios.delete(ROOT_API + "/api/getOrderStatus/1?name=" + this.props.match.params.id).then(response => {
            this.setState({ defaultv: parse(response.data[0].value_footer) })
        }).catch(error => {});
    }
    componentDidUpdate() {
        if (this.state.pid != this.props.match.params.id) {
            this.componentWillMount()
        }
    }
    
    render() {
        return (
            <div>
                <Header />
                <Container style={{ overflow: 'auto', height: '500px' }}>
                    <h1>
                        {this.props.match.params.id =='AboutUs'&& 'About us'}
                        {this.props.match.params.id =='ContactUs'&& 'Contact us'}
                        {this.props.match.params.id =='Policy'&& 'Policy'}                    
                    </h1>
                    <hr/>
                    <Row>
                        <Col style={{ fontSize: '22px' }}>
                        {this.state.defaultv}
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        )
    }
}
