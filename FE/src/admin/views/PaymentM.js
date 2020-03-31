import React, { Component, useState } from 'react'
import Navbar from '../components/navbar';
import { Container, Row, Col, Card, Button, Modal, Table } from 'react-bootstrap';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { MdDelete, MdAdd } from 'react-icons/md';
import ROOT_API from '../../config/API'


function AddPaymentM() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name_PM, setname_PM] = useState('');
    const channame = (e) => {
        setname_PM(e.target.value)
    }
    const sub = () => {
        axios.post(ROOT_API + '/api/paymentMethod?name_payment_method=' + name_PM).then(response => {
            window.location.reload(false);
        }).catch(error => {});
    }
    return (
        <div>
            <Button className="btnbuy" onClick={handleShow}><MdAdd /> : เพิ่มวิธีการจ่ายเงิน</Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title><MdAdd /> : เพิ่มวิธีการจ่ายเงิน</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea className="form-control" rows="3" id="comment" placeholder="วิธีชำระเงิน รายละเอียด เลขบัญชี"
                        maxLength="300" onChange={channame}
                    ></textarea>

                </Modal.Body>
                <Modal.Footer>
                    <Button className="btnbuy" onClick={handleClose} >
                        Close
                    </Button>
                    <Button className="btnbuy" onClick={sub} >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
function EditPaymentM(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name_PM, setname_PM] = useState('');
    const [key_PM, setkey_PM] = useState(props.keyy);
    const sub = () => {
        axios.put(ROOT_API + '/api/paymentMethod/' + props.id + '?name_payment_method=' + name_PM
            + "&key_payment_method=" + key_PM
        ).then(response => {
            window.location.reload(false);
        }).catch(error => {});
    }
    return (
        <>
            <Button className="btnbuy" onClick={handleShow}><FaEdit /></Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>แก้ไขวิธีการจ่ายเงิน</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea className="form-control" rows="3" id="comment" placeholder="วิธีชำระเงิน รายละเอียด เลขบัญชี"
                        defaultValue={props.name}
                        maxLength="300" onChange={(e) => { setname_PM(e.target.value) }}
                    ></textarea>
                    <input className="form-control" placeholder="เลขที่เสียภาษี" maxLength="8"
                        defaultValue={props.keyy} onChange={(e) => { setkey_PM(e.target.value) }} ></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btnbuy" onClick={handleClose} >
                        Close
                    </Button>
                    <Button className="btnbuy" onClick={sub} >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
function EditPaymentM2(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name_PM, setname_PM] = useState('');
    const [key_PM, setkey_PM] = useState('');
    const sub = () => {
        axios.put(ROOT_API + '/api/paymentMethod/' + props.id + '?name_payment_method=' + name_PM
            + "&key_payment_method=" + key_PM
        ).then(response => {
            window.location.reload(false);
        }).catch(error => {});
    }
    return (
        <>
            <Button className="btnbuy" onClick={handleShow}><FaEdit /></Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>แก้ไขวิธีการจ่ายเงิน</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea className="form-control" rows="3" id="comment" placeholder="วิธีชำระเงิน รายละเอียด เลขบัญชี"
                        defaultValue={props.name}
                        maxLength="300" onChange={(e) => { setname_PM(e.target.value) }}
                    ></textarea>

                </Modal.Body>
                <Modal.Footer>
                    <Button className="btnbuy" onClick={handleClose} >
                        Close
                    </Button>
                    <Button className="btnbuy" onClick={sub} >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
function Del(props) {
    const sub = () => {
        axios.delete(ROOT_API + '/api/paymentMethod/' + props.id
        ).then(response => {
            window.location.reload(false);
        }).catch(error => {});
    }
    return (
        <>
            <Button className="btnbuy" onClick={sub}><MdDelete /></Button>
        </>
    )
}
export default class PaymentM extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pm: []
        }
    }

    componentWillMount() {
        axios.get(ROOT_API + "/api/paymentMethod").then(response => {
            this.setState({ pm: response.data })
           
        }).catch(error => {});
    }
    render() {
        return (
            <div>
                <Row>
                    <Col sm={3} className="navb" ><Navbar /></Col>
                    <Col sm={9}>
                        <br/>
                        <Container>
                            <AddPaymentM />
                            <hr/>
                            <Row>
                                <Col>
                                    <Table responsive striped hover style={{fontSize:'22px'}}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>รายละเรียด</th>
                                                <th>คีย์</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.pm.map((p, index) =>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{p.name_payment_method}</td>
                                                    <td>{p.key_payment_method}</td>
                                                    <td>
                                                        {p.id_payment_method == "dvcxvfv123413" &&
                                                            <EditPaymentM id={p.id_payment_method}
                                                                name={p.name_payment_method}
                                                                keyy={p.key_payment_method}
                                                            />
                                                        }
                                                        {p.id_payment_method != "dvcxvfv123413" && <>
                                                            <EditPaymentM2 id={p.id_payment_method}
                                                                name={p.name_payment_method} />
                                                            <Del id={p.id_payment_method} /></>}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Container>

                    </Col>
                </Row>
            </div>
        )
    }
}
