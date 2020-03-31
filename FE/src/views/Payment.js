import React, { Component, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/Footer';
import p1 from '../img/photo.png';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import ROOT_API from '../config/API'
import Select from 'react-select';
import URL_img from '../config/URL_img'
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import { Container, Row, Col, Image, Nav, Card, Button, Modal, Carousel, Alert } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import '../css/payment.css'
const cookies = new Cookies();
var val = [];
function Example(prods) {
    let history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [imgSrc, setimgSrc] = useState([p1]);
    const [formData1, setformData1] = useState({ file: '' });
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [disableDiv2, setdisableDiv2] = useState(false);
    var divStyle2 = { display: disableDiv2 ? 'block' : 'none' };
    const datee = (data) => {
        setStartDate(data)
    }
    const timee = (data) => {
        setStartTime(data)
    }
    const onChange = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            setformData1({ file: e.target.result })
            console.warn("img data ", e.target.result)
            //(formData1)
        }
        reader.onloadend = (e) => {
            setimgSrc([reader.result])
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const cookies = new Cookies();
        cookies.get('ID_Shop')
        const date = startDate.getDate(); //Current Date
        const month = startDate.getMonth() + 1; //Current Month
        const year = startDate.getFullYear(); //Current Year
        const hours = startTime.getHours('00'); //Current Hours
        const min = startTime.getMinutes('00'); //Current Minutes
        const sec = startTime.getSeconds('00'); //Current Seconds
        const date_now = year + "-" + month + "-" + date + " " + hours + ":" + min + ":" + sec;
        //('formData1', formData1)
        if (formData1.file != '') {
            axios.post(ROOT_API + '/api/notifyPayment?date_notify_pay=' + date_now +
                '&id_payment_method='
                + prods.id_payment_method + '&id_order=' + prods.id_order, formData1).then(Response => {
                    //(Response);
                }).then(error => {
                     
                });
            axios.put(ROOT_API + '/api/orderProduct/' + prods.id_order).then(Response => {
                //(Response);

                alert('insert sucsess !!')
                history.push("/Tracking");

            }).then(error => {
                 
            });

        } else {
            alert("อัพโหลดรูปหลักฐานการโอนเงิน")
        }

    }
    const selepay = (value) => {

        if (prods.payy == value.label) {
            setdisableDiv2(false)
        } else {
            setdisableDiv2(true)
        }
    }
    return (
        <>
            <Button variant="primary" className="bt-P" onClick={handleShow}>
                {cookies.get('Language') == undefined && ' แจ้งชำระเงิน'}
                {cookies.get('Language') == 'th' && ' แจ้งชำระเงิน'}
                {cookies.get('Language') == 'en' && 'Payment'}
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {cookies.get('Language') == undefined && ' แจ้งชำระเงิน : '}
                        {cookies.get('Language') == 'th' && ' แจ้งชำระเงิน : '}
                        {cookies.get('Language') == 'en' && 'Payment'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form  >
                        <Row>
                            <Col>
                                < h4>วิธีการชำระเงิน : </h4>
                                <Select name={prods.id_order}
                                    onChange={selepay}
                                    options={val}
                                />
                                <Alert style={divStyle2} key='danger' variant='danger'>
                                    กรุณาเลือกวิธีการชำระเงินใหม่
                                </Alert>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                < h4>วันที่ชำระเงิน : </h4>
                                <DatePicker
                                    className="form-control"
                                    dateFormat="yyyy-MM-dd"
                                    selected={startDate}
                                    onChange={datee}

                                />
                            </Col>
                            <Col>
                                < h4>เวลาชำระเงิน : </h4>
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
                                < h4>หลักฐานการชำระเงิน : </h4>
                                <input className="form-control" type="file" name="file" onChange={onChange} /><br /><br />
                                <div style={{textAlign:'center'}}> <Image src={imgSrc} height="200" width="200" /><br /><br /></div>
                            </Col>
                        </Row>



                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="bt-P" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" className="bt-P" onClick={handleSubmit}>
                        Save
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
function DePor(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button className="bt-P" onClick={handleShow}>รายละเอียด</Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {cookies.get('Language') == undefined && ' รายละเอียด : '}
                        {cookies.get('Language') == 'th' && ' รายละเอียด : '}
                        {cookies.get('Language') == 'en' && 'Detail : '}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.el}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="bt-P" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default class Payment extends Component {
    constructor() {
        super();
        this.state = {
            prods: [],
            prodDiv: '',
            dts: [], dt1s: [],
            ttts: [],
            t1: '', Loading: true, divdeli: [], payments: []
        }
    }

    componentWillMount() {
        const cookies = new Cookies();
        axios.get(ROOT_API + "/api/getOrderPayment?id_user=" + cookies.get('ID_Login')).then(response => {

            this.setState({ prods: response.data });
            const id_order1 = this.state.prods.map(prod => prod.id_order);
            const date_order1 = this.state.prods.map(prod => prod.date_order);
            const total_order1 = this.state.prods.map(prod => prod.total_order);
            const id_payment_method1 = this.state.prods.map(prod => prod.id_payment_method);
            const numid1 = this.state.prods.map(prod => prod.num_id);
            const status1 = this.state.prods.map(prod => prod.status);
            const name_payment_method = this.state.prods.map(prod => prod.name_payment_method);
            if (id_order1.length == 0) {
                this.setState({
                    Loading: false,
                    dt1s: <div className="PN"><h3>
                        ไม่มีรายการสินค้าที่ต้องชำระ
                        {cookies.get('Language') == undefined && 'ไม่มีรายการสินค้าที่ต้องชำระ'}
                        {cookies.get('Language') == 'th' && 'ไม่มีรายการสินค้าที่ต้องชำระ'}
                        {cookies.get('Language') == 'en' && 'No products to pay.'}
                    </h3></div>
                })
            }
            for (let index = 0; index < id_order1.length; index++) {
                axios.get(ROOT_API + "/api/orderProductDetail/1?id_order=" + id_order1[index]).then(response => {
                    this.setState({
                        ttts: response.data,
                        dt2s:<></>
                    })
                    const name_product = this.state.ttts.map(ttt => ttt.name_product)
                    const num = this.state.ttts.map(ttt => ttt.num)
                    const price_product = this.state.ttts.map(ttt => ttt.price_product)
                    const name_shop = this.state.ttts.map(ttt => ttt.name_shop)
                    const name_delivery_method = this.state.ttts.map(ttt => ttt.delivery_method)
                    const img_product = this.state.ttts.map(ttt => ttt.img_product)
                    const total = this.state.ttts.map(ttt => ttt.total)
                    const property = this.state.ttts.map(ttt => ttt.property)
                    const img_product1 = this.state.ttts.map(ttt => ttt.img_product1)
                    for (let i1 = 0; i1 < name_product.length; i1++) {
                        let ll = name_product[i1].length
                        let aa = 20;
                        if (i1 == 0) {
                            this.setState({
                                dt2s: <>{this.state.dt2s}
                                    <Container className="P1">
                                        <Row>
                                            <Col>
                                                <Row>
                                                    <Col sm={5}><h3>No : {numid1[index]}</h3></Col>
                                                    <Col><h3>

                                                        {cookies.get('Language') == undefined && 'วันที่สั่งซื้อ : '}
                                                        {cookies.get('Language') == 'th' && 'วันที่สั่งซื้อ : '}
                                                        {cookies.get('Language') == 'en' && 'Order date : '}
                                                        {date_order1[index]} น.</h3></Col>
                                                </Row>
                                                <Row>
                                                    <Col sm={5}><h4>

                                                        {cookies.get('Language') == undefined && 'วิธีการชำระ : '}
                                                        {cookies.get('Language') == 'th' && 'วิธีการชำระ : '}
                                                        {cookies.get('Language') == 'en' && 'Payment method : '}
                                                        {name_payment_method[index]}</h4></Col>
                                                    <Col><h4>
                                                        {cookies.get('Language') == undefined && 'ราคารวมทั้งสิ้น : '}
                                                        {cookies.get('Language') == 'th' && 'ราคารวมทั้งสิ้น : '}
                                                        {cookies.get('Language') == 'en' && 'Net price : '}
                                                        {total_order1[index]} บาท</h4></Col>
                                                </Row>
                                                <Row>
                                                    <Col sm={5}><h4>
                                                        {cookies.get('Language') == undefined && 'สถานะ : '}
                                                        {cookies.get('Language') == 'th' && 'สถานะ : '}
                                                        {cookies.get('Language') == 'en' && 'Status : '}
                                                        {status1[index]}</h4></Col>
                                                    <Col><Example
                                                        id_order={id_order1[index]} payy={name_payment_method[index]}
                                                        id_payment_method={id_payment_method1[index]} /></Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Container>
                                    <hr /></>
                            })
                        }
                        this.setState({
                            dt2s: <>{this.state.dt2s}
                                <Container>
                                    <Row>
                                        <Col>
                                            <Row>
                                                <Col sm={4} className="PD" ><img src={URL_img + img_product[i1]} width="100%" ></img></Col>
                                                <Col className="PM" ><img src={URL_img + img_product[i1]} width="100%" ></img></Col>
                                                <Col style={{width:'40%'}}>
                                                    <Row><Col><h3 className="nameCut" style={{marginBottom:'0'}}>
                                                        {name_product[i1]}                                                        
                                                    </h3></Col></Row>
                                                    <Row ><Col><h4 className="nameCut">
                                                        {cookies.get('Language') == undefined && 'ราคารวม : '}
                                                        {cookies.get('Language') == 'th' && 'ราคารวม : '}
                                                        {cookies.get('Language') == 'en' && 'Total price : '}
                                                        {total[i1]}</h4></Col></Row>
                                                    <Row>
                                                        <Col>
                                                            <DePor
                                                                el={<>
                                                                    <Row>
                                                                        <Col sm={4} ><img style={{marginBottom:'20px'}} src={URL_img + img_product[i1]} width="100%" ></img></Col>
                                                                        <Col>
                                                                            <Row><Col><h3>{name_product[i1]}</h3></Col></Row>
                                                                            <Row><Col><h4>
                                                                                {cookies.get('Language') == undefined && 'ราคา/ชิ้น : '}
                                                                                {cookies.get('Language') == 'th' && 'ราคา/ชิ้น : '}
                                                                                {cookies.get('Language') == 'en' && 'Price/unit : '}
                                                                                {price_product[i1]}</h4></Col></Row>
                                                                            <Row><Col><h4>
                                                                                {cookies.get('Language') == undefined && 'จำนวน : '}
                                                                                {cookies.get('Language') == 'th' && 'จำนวน : '}
                                                                                {cookies.get('Language') == 'en' && 'Amount : '}
                                                                                {num[i1]}</h4></Col></Row>
                                                                            <Row><Col><h4>
                                                                                {cookies.get('Language') == undefined && 'ราคารวม : '}
                                                                                {cookies.get('Language') == 'th' && 'ราคารวม : '}
                                                                                {cookies.get('Language') == 'en' && 'Total price : '}
                                                                                {total[i1]}</h4></Col></Row>
                                                                            <Row><Col><h4>
                                                                                {cookies.get('Language') == undefined && 'ชื่อร้านค้า : '}
                                                                                {cookies.get('Language') == 'th' && 'ชื่อร้านค้า : '}
                                                                                {cookies.get('Language') == 'en' && 'Name shop : '}
                                                                                {name_shop[i1]}</h4></Col></Row>
                                                                            <Row><Col><h4>
                                                                                {cookies.get('Language') == undefined && 'วิธีการจัดส่ง : '}
                                                                                {cookies.get('Language') == 'th' && 'วิธีการจัดส่ง : '}
                                                                                {cookies.get('Language') == 'en' && 'Delivery method : '}
                                                                                {name_delivery_method[i1]}</h4></Col></Row>
                                                                        </Col>
                                                                    </Row>
                                                                </>}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <hr />
                                </Container>
                            </>
                        })
                        if (i1 == (name_product.length - 1)) {
                            this.setState({
                                dt1s: <>{this.state.dt1s}<Col sm={6}><Card className="ctt">{this.state.dt2s}</Card><br /><br /></Col>
                                </>,
                                Loading: false
                            })
                        }



                    }
                }).catch(error => {});
            }

        }).catch(error => {});
        axios.get(ROOT_API + "/api/paymentMethod").then(response => {
            this.setState({ payments: response.data })
            let tt = this.state.payments.length
            for (let it3 = 1; it3 < tt; it3++) {

                val = [...val, {
                    'value': this.state.payments[it3].id_payment_method,
                    'label': this.state.payments[it3].name_payment_method
                }]


            }

        }).catch(error => {});

    }
    test() {
        //(this.state.dt1s)
    }
    render() {

        return (
            <div>
                <Header />
                <Container><h1>
                    {cookies.get('Language') == undefined && ' แจ้งชำระเงิน'}
                    {cookies.get('Language') == 'th' && ' แจ้งชำระเงิน'}
                    {cookies.get('Language') == 'en' && 'Payment notification'}
                </h1><hr />
                    {this.state.Loading ? <ReactLoading type="spin" color="#3c6a15" height={'10%'} width={'10%'} /> :
                        <Row>
                            {this.state.dt1s}
                        </Row>
                    }

                </Container>
                <Footer />

            </div>
        );
    }
}