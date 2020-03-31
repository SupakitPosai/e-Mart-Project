import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navbar.css';
import axios from 'axios';
import ROOT_API from '../../config/API'
import URL_img from '../../config/URL_img'
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Nav, Card, Button, Modal, Carousel } from 'react-bootstrap';




function Example(prods) {
    let history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [imgSrc, setimgSrc] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(ROOT_API + '/api/orderProductDetail/' + prods.id).then(Response => {
           
        }).then(error => {
          
        });
        axios.put(ROOT_API + '/api/putOrder/' + prods.id).then(Response => {
           

            alert("ยืนยันการชำระสำเร็จ")
            window.location.reload(false);
        }).then(error => {
           
        });
    }
    return (
        <>
            <Button variant="primary" className="btnbuy" onClick={handleShow}>
                ตรวจสอบการชำระเงิน
        </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>ตรวจสอบการชำระเงิน : </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form  >
                        <h3>หลักฐาน : </h3>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <Image src={prods.img} height="300" width="300" /><br /><br />
                        </div>
                        <h3>เวลาการชำระเงิน : {prods.date}</h3>
                        <h3>จำนวนเงินทั้งหมด : {prods.total}</h3>
                        <h3>วิธีการชำระเงิน : {prods.method}</h3>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btnbuy" onClick={handleClose}>
                        Close
            </Button>
                    <Button className="btnbuy" variant="primary" onClick={handleSubmit}>
                        ยืนยันการโอนเงิน
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default class PaymentAdmin extends Component {

    constructor() {
        super();
        this.state = {
            prods: [],
            prodDiv: '',
            users: [],
            NotPay: {},
            payment_method: {}, ttts: [], dt1s: ''
        }
    }

    componentWillMount() {
        // const cookies = new Cookies();
        axios.get(ROOT_API + "/api/getOrderStatus").then(response => {
            this.setState({ prods: response.data })
            const num_id = this.state.prods.map(prod => prod.num_id)
            // const date_order = this.state.prods.map(prod => prod.date_order)
            const date_order = this.state.prods.map(prod => prod.date_notify_pay)
            const total_order = this.state.prods.map(prod => prod.total_order)
            const name_payment_method = this.state.prods.map(prod => prod.name_payment_method)
            const name_user = this.state.prods.map(prod => prod.name_user)
            const status = this.state.prods.map(prod => prod.status)
            const id_order = this.state.prods.map(prod => prod.id_order)
            const img = this.state.prods.map(prod => prod.image_notify_pay)
            for (let index = 0; index < num_id.length; index++) {
                axios.get(ROOT_API + "/api/orderProductDetail/1?id_order=" + id_order[index]).then(response => {
                    this.setState({
                        ttts: response.data
                    })
                    this.setState({
                        dt2s: <></>
                    })
                    const name_product = this.state.ttts.map(ttt => ttt.name_product)
                    const num = this.state.ttts.map(ttt => ttt.num)
                    const price_product = this.state.ttts.map(ttt => ttt.price_product)
                    const name_shop = this.state.ttts.map(ttt => ttt.name_shop)
                    const name_delivery_method = this.state.ttts.map(ttt => ttt.name_delivery_method)
                    const img_product = this.state.ttts.map(ttt => ttt.img_product)
                    const total = this.state.ttts.map(ttt => ttt.total)
                    const property = this.state.ttts.map(ttt => ttt.property)
                    const img_product1 = this.state.ttts.map(ttt => ttt.img_product1)
                    for (let i1 = 0; i1 < name_product.length; i1++) {
                        const imgg = URL_img + img_product1[i1]
                        if (i1 == 0) {
                            this.setState({
                                dt2s: <> {this.state.dt2s}
                                    <Row>
                                        <Col>

                                            <Row>
                                                <Col><h2>{num_id[index]}</h2></Col>
                                                <Col><h2>{date_order[index]}</h2></Col>
                                                <Col><h2>{total_order[index]}</h2></Col>
                                                {/* <Col><h2>{name_payment_method[index]}</h2></Col> */}
                                                <Col><h2>{name_user[index]}</h2></Col>
                                                <Col><h2>{status[index]}</h2></Col>
                                                <Col><Example id={id_order[index]} total={total_order[index]}
                                                    date={date_order[index]} method={name_payment_method[index]} img={URL_img + img[index]}
                                                /></Col>
                                            </Row>

                                        </Col>
                                    </Row>
                                    <hr />
                                </>
                            })

                        }
                        this.setState({
                            dt2s: <>{this.state.dt2s}<Row>

                                <Col>
                                    <Row>
                                        <Col><img src={imgg} width="150px" height="150px"></img></Col>
                                        <Col><h2>{name_product[i1]}</h2> <h4>{property[i1]}</h4></Col>
                                        <Col><h2>{num[i1]}</h2></Col>
                                        <Col><h2>{price_product[i1]}</h2></Col>
                                        <Col><h2>{total[i1]}</h2></Col>
                                        <Col><h2>{name_shop[i1]}</h2></Col>
                                        <Col><h2>{name_delivery_method[i1]}</h2></Col>
                                    </Row>

                                </Col>
                            </Row>
                            </>
                        })
                        if (i1 == (name_product.length - 1)) {
                            this.setState({
                                dt2s: <><Card>{this.state.dt2s}</Card>
                                </>
                            })
                        }
                    }
                    this.setState({
                        dt1s: <>{this.state.dt1s}{this.state.dt2s}
                        </>
                    })

                }).catch(error =>{} );
            }


        }).catch(error => {});



    }
    render() {
        // const cookies = new Cookies();

        return (
            <div>


                <Row >

                    <Col sm={3} className="navb" ><Navbar /></Col>
                    <Col sm={9}>
                    <Container >
                        <h1>ตรวจสอบการชำระเงิน</h1><hr />
                        <Row>
                            {/* <Col sm={12}>{this.state.prodDiv}</Col> */}
                            <Col sm={12}> {this.state.dt1s}</Col>
                        </Row>
                    </Container>

                    </Col>
                    

                </Row>

            </div>
        );
    }
}
