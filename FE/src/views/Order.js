import React, { Component, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/Footer';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import ROOT_API from '../config/API'
import URL_img from '../config/URL_img'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Nav, Card, Button, Modal, Carousel } from 'react-bootstrap';
import '../css/order.css'

function Example(prods) {
    let history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [imgSrc, setimgSrc] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [dateall, setdateall] = useState('');
    const [track, settrack] = useState('');
    const tracka = (e) => {
        settrack(e.target.value)
    }
    const datee = (data) => {
        setStartDate(data)


    }
    const timee = (data) => {
        setStartTime(data)

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (track != '') {
            axios.put(ROOT_API + '/api/putOrderDetail/' + prods.id + '?id_product=' + prods.id_product + '&id_order=' + prods.id
                + '&date_delivery=' + startDate.getFullYear() + '-' + (startDate.getMonth() + 1)
                + '-' + startDate.getDate() + ' ' + startTime.getHours('00') + ':'
                + startTime.getMinutes('00') + ':' + startTime.getSeconds('00') +
                '&track_num=' + track
            ).then(Response => {
                //(Response);
                window.location.reload(false);
                alert("ยืนยันการจัดส่งสำเร็จ")
                setShow(false);

            }).then(error => {
                 
            });
        } else {
            alert("กรุณาใส่เลขพัสดุ")
        }

    }
    return (
        <>
            <Button variant="primary" className="btnbuy" onClick={handleShow}>
                เลขพัสดุ
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>อัพเดทเลขการจัดส่ง : </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {prods.el}
                    <hr />
                    <form  >
                        <Row>
                            <Col>
                                <h4>วันที่จัดส่ง : </h4>
                                <DatePicker
                                    className="form-control"
                                    dateFormat="yyyy-MM-dd"
                                    selected={startDate}
                                    onChange={datee}

                                />
                            </Col>
                            <Col>
                                <h4>เวลาจัดส่ง : </h4>
                                <DatePicker
                                    className="form-control"
                                    selected={startTime}
                                    onChange={timee}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm:ss"

                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h4>เลขพัสดุ : </h4>
                                <input className="form-control" type="text" name="price_product"
                                    placeholder="เลขพัสดุ"
                                    onChange={tracka}
                                />
                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btnbuy" onClick={handleClose}>
                        Close
            </Button>
                    <Button className="btnbuy" onClick={handleSubmit}>
                        ยืนยันการจัดส่ง
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default class Order extends Component {
    constructor() {
        super();
        this.state = {
            prods: [],
            prodDiv: ''

        }
    }

    componentWillMount() {
        const cookies = new Cookies();
        axios.get(ROOT_API + "/api/orderProductDetail?id_shop=" + cookies.get('ID_Shop')).then(response => {
            this.setState({ prods: response.data });

            const id_order = this.state.prods.map(prod => prod.id_order);
            const id_product = this.state.prods.map(prod => prod.id_product);
            const img = this.state.prods.map(prod => prod.img_product);
            const name_product = this.state.prods.map(prod => prod.name_product);
            const num = this.state.prods.map(prod => prod.num);
            const price_product = this.state.prods.map(prod => prod.price_product);
            const total = this.state.prods.map(prod => prod.total);
            const name_user = this.state.prods.map(prod => prod.name_user);
            const address_user = this.state.prods.map(prod => prod.add_send);
            const name_delivery_method = this.state.prods.map(prod => prod.delivery_method);
            const status_order_detail = this.state.prods.map(prod => prod.status_order_detail);
            const property = this.state.prods.map(prod => prod.property);
            const img_product1 = this.state.prods.map(prod => prod.img_product1);

            for (let index = 0; index < name_product.length; index++) {
               
                this.setState({
                    prodDiv: <>{this.state.prodDiv}<Col sm={6}>
                        <Card>
                            <Row>
                                <Col className="showDO" sm={4}><Image src={URL_img + img_product1[index]} width='100%'></Image> </Col>
                                <Col className="showMO"><Image src={URL_img + img_product1[index]} width='100%' ></Image> </Col>
                                <Col style={{ padding: '0 15px 0 0' ,width:'40%'}}>
                                    <Row> <Col><h2 className="nameCut" style={{ marginBottom: '0' }}>
                                        {name_product[index]}                                       
                                    </h2></Col></Row>
                                    <Row> <Col><h4 className="nameCut">{property[index]}</h4></Col></Row>
                                    <Row> <Col><h4>สถานะ : {status_order_detail[index]}</h4></Col></Row>
                                    <Row> <Col>{status_order_detail[index] == 'รอการจัดส่ง' && <Example
                                        id={id_order[index]}
                                        id_product={id_product[index]} el={<>
                                            <Row>
                                                <Col sm={5}><Image style={{ marginBottom: '15px' }} src={URL_img + img_product1[index]} width='100%'></Image>
                                                </Col>
                                                <Col>
                                                    <Row> <Col><h2>{name_product[index]}</h2><h4>รายละเอียด : {property[index]}</h4></Col></Row>
                                                    <Row> <Col><h4>จำนวน : {num[index]}</h4></Col></Row>
                                                    <Row> <Col><h4>ราคา/ชิ้น : {price_product[index]}</h4></Col></Row>
                                                    <Row> <Col><h4>ราคารวม : {total[index]}</h4></Col></Row>
                                                    <Row> <Col><h4>ชื่อผู้สั่ง : {name_user[index]}</h4></Col></Row>
                                                    <Row> <Col><h4>ที่อยู่จัดส่ง : {address_user[index]}</h4></Col></Row>
                                                    <Row> <Col><h4>วิธีการจัดส่ง : {name_delivery_method[index]}</h4></Col></Row>
                                                    <Row> <Col><h4>สถานะ : {status_order_detail[index]}</h4></Col></Row>
                                                </Col>
                                            </Row>
                                        </>}
                                    />}</Col></Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col><br /></>
                })
            }
        }).catch(error => {});

    }
    render() {
        return (
            <div>
                <Header />
                <Container><h1>Order</h1><hr />
                    <Row>
                        {this.state.prodDiv}
                    </Row>

                </Container>
                <Footer />
            </div>
        );
    }
}