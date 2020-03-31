import React, { Component, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/Footer';
import ReactDOM from 'react-dom';
import '../css/tracking.css'
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import ROOT_API from '../config/API'
import URL_img from '../config/URL_img'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Container, Row, Col, Image, Nav, Card, Button, Modal, Carousel } from 'react-bootstrap';
import { GiReceiveMoney } from "react-icons/gi";
import { MdRateReview } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
const cookies = new Cookies();




function DeTracking(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Button className="btnbuy" onClick={handleShow}>รายละเอียด</Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>รายละเอียด : </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.el}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btnbuy" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default class Tracking extends Component {
    constructor() {
        super();
        this.state = {
            prods: [],
            prodDiv: '', prodDiv2: ''
        }
    }
    componentWillMount() {
        const cookies = new Cookies();
        axios.post(ROOT_API + "/api/getOrderPayment?id_user=" + cookies.get('ID_Login')).then(response => {
            this.setState({ prods: response.data });
            //(cookies.get('ID_Login'))
            //(this.state.prods)
            const id_order = this.state.prods.map(prod => prod.id_order);
            const num_id = this.state.prods.map(prod => prod.num_id);
            const img_product = this.state.prods.map(prod => prod.img_product);
            const name_product = this.state.prods.map(prod => prod.name_product);
            const num = this.state.prods.map(prod => prod.num);
            const price_product = this.state.prods.map(prod => prod.price_product);
            const name_delivery_method = this.state.prods.map(prod => prod.delivery_method);
            const status_order_detail = this.state.prods.map(prod => prod.status_order_detail);
            const total = this.state.prods.map(prod => prod.total);
            const name_shop = this.state.prods.map(prod => prod.name_shop);
            const property = this.state.prods.map(prod => prod.property)
            const img_product1 = this.state.prods.map(prod => prod.img_product1)


            for (let index = 0; index < num_id.length; index++) {


                const img1 = URL_img + img_product1[index]
                if (status_order_detail[index] == "รอการตรวจสอบ") {
                    axios.get(ROOT_API + '/api/notifyPayment?id_order=' + id_order[index]).then(response => {
                        const s1 = response.data[0]

                        this.setState({
                            prodDiv: <>{this.state.prodDiv}<Col sm={6}><Card className="cardT">
                                <Row >
                                    <Col className="showDT" sm={4}><Image src={img1} width='100%' ></Image></Col>
                                    <Col className="showMT"><Image src={img1} width='100%' ></Image></Col>
                                    <Col className="colT" style={{ width: '40%' }}>
                                        <Row>
                                            <Col><h2 className="nameCut">
                                                {name_product[index]}
                                            </h2> </Col>
                                        </Row>
                                        <Row>
                                            <Col><h4>No: {num_id[index]}</h4></Col>
                                        </Row>
                                        <Row>
                                            <Col><h4>สถานะ : {status_order_detail[index]}</h4></Col>
                                        </Row>
                                        <Row><Col><DeTracking
                                            el={<>
                                                <Row >
                                                    <Col sm={5}><Image src={img1} width='100%' ></Image></Col>

                                                    <Col className="colT">
                                                        <Row>
                                                            <Col><h2>{name_product[index]}</h2> </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><h4>รายละเอียด : {property[index]}</h4></Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><h4>No: {num_id[index]}</h4></Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><h4>ราคา : {price_product[index]}</h4></Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><h4>จำนวน : {num[index]}</h4></Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><h4>ราคารวม : {total[index]}</h4></Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><h4>ชื่อร้านค้า : {name_shop[index]}</h4></Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><h4>จัดส่ง : {name_delivery_method[index]}</h4></Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><h4>สถานะ : {status_order_detail[index]}</h4></Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <TrackingShow1 status={status_order_detail[index]} date_order={s1.date_notify_pay} src={URL_img + s1.image_notify_pay} />
                                            </>}
                                        /></Col></Row>
                                    </Col>
                                </Row>

                            </Card></Col><br /></>
                        })
                        console.warn(response.data)
                    }).catch(error => {});
                } else if (status_order_detail[index] == "รอการชำระเงิน") {
                    this.setState({
                        prodDiv: <>{this.state.prodDiv}<Col sm={6}><Card className="cardT">
                            <Row>
                                <Col className="showDT" sm={4}><Image src={img1} width='100%' ></Image></Col>
                                <Col className="showMT"><Image src={img1} width='100%' ></Image></Col>
                                <Col className="colT" style={{ width: '40%' }}>
                                    <Row>
                                        <Col><h2 className="nameCut">
                                            {name_product[index]}
                                        </h2> </Col>
                                    </Row>
                                    <Row>
                                        <Col><h4>No: {num_id[index]}</h4></Col>
                                    </Row>
                                    <Row>
                                        <Col><h4>สถานะ : {status_order_detail[index]}</h4></Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <DeTracking
                                                el={<>
                                                    <Row>
                                                        <Col sm={5}><Image src={img1} width='100%' ></Image></Col>
                                                        <Col className="colT">
                                                            <Row>
                                                                <Col><h2>{name_product[index]}</h2> </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col><h4>รายละเอียด : {property[index]}</h4></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col><h4>No: {num_id[index]}</h4></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col><h4>ราคา : {price_product[index]}</h4></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col><h4>จำนวน : {num[index]}</h4></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col><h4>ราคารวม : {total[index]}</h4></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col><h4>ชื่อร้านค้า : {name_shop[index]}</h4></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col><h4>จัดส่ง : {name_delivery_method[index]}</h4></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col><h4>สถานะ : {status_order_detail[index]}</h4></Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    <Tracking1 status={status_order_detail[index]} />
                                                </>}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card></Col><br /></>
                    })
                } else if (status_order_detail[index] == "รอการจัดส่ง") {
                    axios.get(ROOT_API + '/api/notifyPayment?id_order=' + id_order[index]).then(response => {
                        const s1 = response.data[0]

                        this.setState({
                            prodDiv: <>{this.state.prodDiv}<Col sm={6}><Card className="cardT">
                                <Row >
                                    <Col className="showDT" sm={4}><Image src={img1} width='100%' ></Image></Col>
                                    <Col className="showMT"><Image src={img1} width='100%' ></Image></Col>
                                    <Col className="colT" style={{ width: '40%' }}>
                                        <Row>
                                            <Col><h2 className="nameCut">

                                                {name_product[index]}
                                            </h2> </Col>
                                        </Row>
                                        <Row>
                                            <Col><h4>No: {num_id[index]}</h4></Col>
                                        </Row>
                                        <Row>
                                            <Col><h4>สถานะ : {status_order_detail[index]}</h4></Col>
                                        </Row>
                                        <Row>
                                            <Col><DeTracking
                                                el={<>
                                                    <Row >
                                                        <Col sm={5}><Image src={img1} width='100%' ></Image></Col>
                                                        <Col className="colT">
                                                            <Row>
                                                                <Col><h2>{name_product[index]}</h2> </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col><h4>รายละเอียด : {property[index]}</h4></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col><h4>No: {num_id[index]}</h4></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col><h4>ราคา : {price_product[index]} จำนวน : {num[index]}  ราคารวม : {total[index]}</h4></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col><h4>ชื่อร้านค้า : {name_shop[index]}</h4></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col><h4>จัดส่ง : {name_delivery_method[index]}</h4></Col>
                                                            </Row>
                                                            <Row>
                                                                <Col><h4>สถานะ : {status_order_detail[index]}</h4></Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    <TrackingShow2 status={status_order_detail[index]} date_order={s1.date_notify_pay} src={URL_img + s1.image_notify_pay} />
                                                </>}
                                            /></Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card></Col><br /></>
                        })

                    }).catch(error => {});
                } else if (status_order_detail[index] == "จัดส่งสินค้าแล้ว") {
                    axios.get(ROOT_API + '/api/notifyPayment?id_order=' + id_order[index]).then(response => {
                        const s1 = response.data[0]
                        axios.delete(ROOT_API + '/api/orderProductDetail/' + id_order[index]).then(response => {
                            const s3 = response.data

                            this.setState({
                                prodDiv: <>{this.state.prodDiv}<Col sm={6}><Card className="cardT">
                                    <Row>
                                        <Col className="showDT" sm={4}><Image src={img1} width='100%' ></Image></Col>
                                        <Col className="showMT"><Image src={img1} width='100%' ></Image></Col>
                                        <Col className="colT" style={{ width: '40%' }}>
                                            <Row>
                                                <Col><h2 className="nameCut">
                                                    {name_product[index]}
                                                </h2> </Col>
                                            </Row>
                                            <Row>
                                                <Col><h4>No: {num_id[index]}</h4></Col>
                                            </Row>
                                            <Row>
                                                <Col><h4>สถานะ : {status_order_detail[index]}</h4></Col>
                                            </Row>
                                            <Row>
                                                <Col><DeTracking
                                                    el={<>
                                                        <Row>
                                                            <Col sm={5}><Image src={img1} width='100%' ></Image></Col>
                                                            <Col className="colT">
                                                                <Row>
                                                                    <Col><h2>{name_product[index]}</h2> </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col><h4>รายละเอียด : {property[index]}</h4></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col><h4>No: {num_id[index]}</h4></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col><h4>ราคา : {price_product[index]} จำนวน : {num[index]}  ราคารวม : {total[index]}</h4></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col><h4>ชื่อร้านค้า : {name_shop[index]}</h4></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col><h4>จัดส่ง : {name_delivery_method[index]}</h4></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col><h4>สถานะ : {status_order_detail[index]}</h4></Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                        <TrackingShow status={status_order_detail[index]} date_order={s1.date_notify_pay}
                                                            src={URL_img + s1.image_notify_pay} date_deli={s3.date_delivery}
                                                            deli={s3.delivery_method} track={s3.track_num}
                                                        />
                                                    </>}
                                                /></Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                </Card></Col><br /></>
                            })


                        }).catch(error => {});
                    }).catch(error => {});

                }



            }

        }).catch(error => {});
    }
    render() {
        return (
            <div>
                <Header />
                <Container><h1>ตรวจสอบสถานะสินค้า</h1><hr />
                    <Row >
                        {this.state.prodDiv}
                    </Row>

                </Container>
                <Footer />
            </div>
        );
    }
}



export class TrackingShow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            s1: [], s2: <></>, s3: [], i: 0
        }
    }


    render() {
        return (
            <div style={{ backgroundColor: '#f0f0f0' }}>

                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date={this.props.date_order}
                        iconStyle={{ background: '#3c6a15', color: '#fff' }}
                        icon={<GiReceiveMoney />}
                    >
                        <h3 className="vertical-timeline-element-title">ชำระเงินเรียบร้อย</h3>
                        <img src={this.props.src} width="100px"></img>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        // date="2011 - present"
                        iconStyle={{ background: '#3c6a15', color: '#fff' }}
                        icon={<MdRateReview />}
                    >
                        <h3 className="vertical-timeline-element-title">ตรวจสอบเรียบร้อย</h3>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date={this.props.date_deli}
                        iconStyle={{ background: '#3c6a15', color: '#fff' }}
                        icon={<FaShippingFast />}
                    >
                        <h3 className="vertical-timeline-element-title">จัดส่งสินค้าแล้ว</h3>
                        <h4>จัดส่ง : {this.props.deli}</h4>
                        <h4>เลขพัสดุ : {this.props.track}</h4>
                    </VerticalTimelineElement>
                </VerticalTimeline>


            </div>
        )
    }
}
export class TrackingShow1 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            s1: [], s2: <></>, s3: [], i: 0
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: '#f0f0f0' }}>
                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date={this.props.date_order}
                        iconStyle={{ background: '#3c6a15', color: '#fff' }}
                        icon={<GiReceiveMoney />}
                    >
                        <h3 className="vertical-timeline-element-title">ชำระเงินเรียบร้อย</h3>
                        <img src={this.props.src} width="100px"></img>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        // date="2011 - present"
                        iconStyle={{ background: 'rgb(212, 19, 13)', color: '#fff' }}
                        icon={<MdRateReview />}
                    >
                        <h3 className="vertical-timeline-element-title">{this.props.status}</h3>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
        )
    }
}
export class TrackingShow2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            s1: [], s2: <></>, s3: [], i: 0
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: '#f0f0f0' }}>

                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date={this.props.date_order}
                        iconStyle={{ background: '#3c6a15', color: '#fff' }}
                        icon={<GiReceiveMoney />}
                    >
                        <h3 className="vertical-timeline-element-title">ชำระเงินเรียบร้อย</h3>
                        <img src={this.props.src} width="100px"></img>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        // date="2011 - present"
                        iconStyle={{ background: '#3c6a15', color: '#fff' }}
                        icon={<MdRateReview />}
                    >
                        <h3 className="vertical-timeline-element-title">ตรวจสอบเรียบร้อย</h3>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        // date="2011 - present"
                        iconStyle={{ background: 'rgb(212, 19, 13)', color: '#fff' }}
                        icon={<FaShippingFast />}
                    >
                        <h3 className="vertical-timeline-element-title">{this.props.status}</h3>
                    </VerticalTimelineElement>
                </VerticalTimeline>

            </div>
        )
    }
}
export class Tracking1 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            s1: "", s2: <></>, s3: <></>, i: 0
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: '#f0f0f0' }}>
                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        // date="2011 - present"
                        iconStyle={{ background: 'rgb(212, 19, 13)', color: '#fff' }}
                        icon={<GiReceiveMoney />}
                    >
                        <h3 className="vertical-timeline-element-title">{this.props.status}</h3>
                    </VerticalTimelineElement>
                </VerticalTimeline>

            </div>
        )
    }
}
