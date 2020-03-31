import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Image, Nav, Card, Button, Modal, Carousel, Alert } from 'react-bootstrap';




const m = [
    { "m": "January" }, { "m": "February" }, { "m": "March" }, { "m": "April" }, { "m": "May" }, { "m": "June" },
    { "m": "July" }, { "m": "August" }, { "m": "September" }, { "m": "October" }, { "m": "November" }, { "m": "December" }
]

var date = <></>
var y = <></>
export default class DateSelect extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: ''
        }
    }

    componentWillMount() {

        for (let index = 1; index <= 31; index++) {
           
            date = <>{date}<option value={index}>{index}</option></>

        }
        for (let in1 = 1900; in1 <= 2020; in1++) {

            y = <>{y}<option value={in1}>{in1}</option></>
        }

    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <select className="form-control">
                                {date}
                            </select>
                        </Col>
                        <Col>
                            <select className="form-control">
                                {m.map(m =>
                                    <option value={m.m}>{m.m}</option>
                                )}
                            </select>
                        </Col>
                        <Col>
                            <select className="form-control">
                                {y}
                            </select>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
