import React, { Component } from 'react'
import Header from '../components/header';
import Footer from '../components/Footer';
import Cookies from 'universal-cookie';
import axios from 'axios';
import ROOT_API from '../config/API'
import URL_img from '../config/URL_img'
import { Container, Row, Col, Image, Nav, Card, Button, Modal, Carousel, Alert } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import NumberFormat from 'react-number-format';

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pro: [],

            startDate: new Date(),
            disableDiv: false, disableDiv3: false, disableDiv4: true,
            disableDiv2: true, file: '', disableDivpass: false, disableDivpass2: false,
            disableDivpass3: false, disableDivpass4: false,
            imgSrc: '', im: '', card_number: '', name_user: '', email_user: '', tel_user: '',
            date_birth: '', address_user: '', img_name: '', password: '', repass: ''
        }
    }

    componentWillMount() {
        const cookies = new Cookies();
        axios.get(ROOT_API + "/api/users/" + cookies.get('ID_Login')).then(response => {
            this.setState({
                pro: response.data
            })
            var date = new Date("00", "00", "0000")
            if (this.state.pro.date_birth != null) {
                var p = this.state.pro.date_birth.split("-");
                date = new Date(p[0], p[1] - 1, p[2]);
            }

            this.setState({
                startDate: date,
                card_number: this.state.pro.card_number,
                name_user: this.state.pro.name_user,
                email_user: this.state.pro.email_user,
                tel_user: this.state.pro.tel_user,
                date_birth: this.state.pro.date_birth,
                address_user: this.state.pro.address_user,
                img_name: this.state.pro.img_path,
                password: this.state.pro.password
            })
            var img1 = response.data.img_path
            var imgname = img1.substring(0, 4)

            if (imgname == 'http') {
                this.setState({
                    imgSrc: img1,
                    im: img1
                })
            } else {
                this.setState({
                    imgSrc: URL_img + img1,
                    im: URL_img + img1
                })
            }

        }).catch(error => {});
    }
    date(data) {

        this.setState({
            startDate: data,
            date_birth: data.getFullYear() + '-' + (data.getMonth() + 1)
                + '-' + data.getDate()
        })
    }
    edit() {
        this.setState({
            disableDiv: true,
            disableDiv2: false
        })
    }
    submit() {
        const cookies = new Cookies();
        axios.put(ROOT_API + "/api/users/" + cookies.get('ID_Login'), this.state).then(response => {
            window.location.reload(false);
        }).catch(error => {});
    }
    img(e) {
        this.setState({
            disableDiv10: false
        })
        let files = e.target.files;

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (e) => {
            console.warn("img data ", e.target.result)
            this.setState({
                file: e.target.result
            })

            console.warn("file", this.state.file)
        }
        reader.onloadend = (e) => {
            this.setState({
                imgSrc: [reader.result]
            })
        }
    }
    x() {
        this.setState({
            imgSrc: this.state.im
        })
        this.setState({ file: '' })

    }
    card_number(e) { this.setState({ card_number: e.target.value }) }
    name_user(e) { this.setState({ name_user: e.target.value }) }
    email_user(e) { this.setState({ email_user: e.target.value }) }
    tel_user(e) { this.setState({ tel_user: e.target.value }) }
    date_birth(e) { this.setState({ date_birth: e.target.value }) }
    address_user(e) { this.setState({ address_user: e.target.value }) }
    repass() {
        this.setState({
            disableDiv3: true,
            disableDiv4: false
        })
    }
    chpass(e) {
        if (e.target.value == this.state.password) {
            this.setState({
                disableDivpass: true,
                disableDivpass2: false
            })
        } else {
            this.setState({
                disableDivpass2: true,
                disableDivpass: false
            })
        }
        if (e.target.value == '') {
            this.setState({
                disableDivpass2: false,
                disableDivpass: false
            })
        }
    }
    chpass2(e) {
        this.setState({
            repass: e.target.value
        })
    }
    chpass3(e) {
        if (e.target.value == this.state.repass) {
            this.setState({
                disableDivpass3: true,
                disableDivpass4: false,
                password: e.target.value
            })

        } else {
            this.setState({
                disableDivpass4: true,
                disableDivpass3: false
            })
        }
        if (e.target.value == '') {
            this.setState({
                disableDivpass4: false,
                disableDivpass3: false
            })
        }
    }
    submitrepass() {
        if (this.state.disableDivpass == true && this.state.disableDivpass == true) {
            this.submit();
        }

    }
    render() {
        var divStyle = {
            display: this.state.disableDiv ? 'block' : 'none'
        }; var divStyle2 = {
            display: this.state.disableDiv2 ? 'block' : 'none'
        }; var divStyle3 = {
            display: this.state.disableDiv3 ? 'block' : 'none'
        }; var divStyle4 = {
            display: this.state.disableDiv4 ? 'block' : 'none'
        }; var divStylepass = {
            display: this.state.disableDivpass ? 'block' : 'none'
        }; var divStylepass2 = {
            display: this.state.disableDivpass2 ? 'block' : 'none'
        }; var divStylepass3 = {
            display: this.state.disableDivpass3 ? 'block' : 'none'
        }; var divStylepass4 = {
            display: this.state.disableDivpass4 ? 'block' : 'none'
        };
        return (
            <div>
                <Header />
                <Container>
                    <h1>Profile</h1>
                    <hr />
                    <div style={divStyle4}>
                        <Row style={{ backgroundColor: "#ffff", padding: '10px 10px 10px 10px' }}>
                            <Col sm={2}><img src={this.state.imgSrc} style={{ marginBottom: '10px' }} width="100%"></img>
                                <div style={divStyle}>
                                    <Row>
                                        <Col>
                                            <input className="form-control" type="file" name="file" onChange={this.img.bind(this)} />
                                        </Col>
                                        <Col>
                                            <Button className="btnbuy"
                                                onClick={this.x.bind(this)}
                                            >X</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col sm={5}>
                                <h3>เลขที่</h3>
                                <h4 style={divStyle2}>{this.state.pro.card_number}</h4>

                                <NumberFormat format="#############" style={divStyle} type="text" className="form-control"
                                    placeholder={this.state.pro.card_number}
                                    onChange={this.card_number.bind(this)}
                                />
                                <hr />
                                <h3>ชื่อ-สกุล</h3>
                                <h4 style={divStyle2}>{this.state.pro.name_user}</h4>
                                <input style={divStyle} type="text" className="form-control"
                                    defaultValue={this.state.pro.name_user} maxLength="100"
                                    onChange={this.name_user.bind(this)}
                                ></input><hr />

                                <h3>อีเมลล์</h3>
                                <h4>{this.state.pro.email_user}</h4><hr />
                                <h3>เบอร์โทร</h3>
                                <h4 style={divStyle2}>{this.state.pro.tel_user}</h4>
                                <NumberFormat format="###-####-###" style={divStyle} type="text" className="form-control"
                                    placeholder={this.state.pro.tel_user}
                                    onChange={this.tel_user.bind(this)}
                                /><hr />

                            </Col>
                            <Col sm={5}>
                                <h3>วัน-เดือน-ปีเกิด</h3>
                                <h4 style={divStyle2}>{this.state.pro.date_birth}</h4>
                                <div style={divStyle}>
                                    <DatePicker

                                        className="form-control"
                                        dateFormat="yyyy-MM-dd"
                                        selected={this.state.startDate}
                                        onChange={this.date.bind(this)}

                                    /></div><hr />
                                <h3>ที่อยู่</h3>
                                <h4 style={divStyle2}>{this.state.pro.address_user}</h4>
                                <textarea style={divStyle} className="form-control" rows="5" id="comment"
                                    defaultValue={this.state.pro.address_user}
                                    onChange={this.address_user.bind(this)}
                                ></textarea><hr />
                            </Col>
                            <div style={divStyle}>
                                <Button className="btnbuy" onClick={this.submit.bind(this)} >แก้ไข</Button>

                            </div>
                            <div style={divStyle2}>
                                <Button className="btnbuy" onClick={this.edit.bind(this)}>แก้ไขข้อมูลส่วนตัว</Button>
                                <Button className="btnbuy" onClick={this.repass.bind(this)}>แก้ไขรหัสผ่าน</Button>
                            </div>



                        </Row>

                    </div>
                    <div style={divStyle3}>
                        <Row>
                            <Col></Col>
                            <Col sm={8} style={{ backgroundColor: "#ffff", padding: '10px 10px 10px 10px'  }}>
                                <h3>รหัสผ่านเดิม :</h3> <input type="password" className="form-control"
                                    onChange={this.chpass.bind(this)}
                                ></input>
                                <Alert style={divStylepass} key='success' variant='success'>
                                    รหัสผ่านถูกต้อง
                                </Alert>
                                <Alert style={divStylepass2} key='danger2' variant='danger'>
                                    รหัสผ่านไม่ถูกต้อง
                                </Alert>
                                <h3>รหัสผ่านใหม่ :</h3> <input type="password" className="form-control"
                                    onChange={this.chpass2.bind(this)}
                                ></input>
                                <h3>รหัสผ่านใหม่อีกครั้ง :</h3> <input type="password" className="form-control"
                                    onChange={this.chpass3.bind(this)}
                                ></input>
                                <Alert style={divStylepass3} key='success' variant='success'>
                                    รหัสผ่านถูกตรงกัน
                                </Alert>
                                <Alert style={divStylepass4} key='danger2' variant='danger'>
                                    รหัสผ่านไม่ตรงกัน
                                </Alert>
                                <Button className="btnbuy" onClick={this.submitrepass.bind(this)}>บันทึก</Button>
                            </Col>
                            <Col></Col>

                        </Row>
                    </div>

                </Container>
                <Footer />
            </div>
        )
    }
}
