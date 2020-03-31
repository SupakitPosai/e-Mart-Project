import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import ROOT_API from '../config/API'
import p1 from '../img/photo.png';
import '../css/register.css'
import Header from '../components/header';
import Footer from '../components/Footer';
import PasswordInput from '../components/password-input';
// import DateSelect from '../components/dateSelect';
// import DatePicker from "react-datepicker";
import {
    Container,
    Row,
    Col,
    Card,
    Button, Alert, Image
} from 'react-bootstrap'
const m = [{ "m": "เดือน" },
{ "m": "January", "d": 1 }, { "m": "February", "d": 2 }, { "m": "March", "d": 3 }, { "m": "April", "d": 4 }, { "m": "May", "d": 5 }, { "m": "June", "d": 6 },
{ "m": "July", "d": 7 }, { "m": "August", "d": 8 }, { "m": "September", "d": 9 }, { "m": "October", "d": 10 }, { "m": "November", "d": 11 }, { "m": "December", "d": 12 }
]
var date = <></>
var y = <></>
const hasSpecial = value => {
    return new RegExp(/[@]/).test(value);
}
const hasSpecial2 = value => {
    return new RegExp(/[.]/).test(value);
}
class Register extends Component {

    constructor() {
        super();
        this.state = {
            name_user: '',
            formData: { file: '' },
            imgSrc: [p1],
            card_number: '',
            username: '', usernameC: [],
            password: '',
            email_user: '',
            tel_user: '', d1: '', m1: '', y1: '',
            type_user: 'user', startDate: new Date(),
            disableDiv: false, disableDiv2: false, disableDiv3: false, disableDiv4: false, disableDiv5: false,
            disableDiv6: false, disableDiv11: false, disableDiv12: false, disableDiv13: false, disableDiv14: false,
            disableDiv15: false, disableDiv16: false, disableDiv17: false, disableDiv18: false,
        }
        this.handlePasswordChanges = this.handlePasswordChanges.bind(this);
    }
    check() {
        let rr = 0;
        if (this.state.name_user == '') {
            this.setState({ disableDiv11: true })
            rr++
        } else {
            this.setState({ disableDiv11: false })
        }
        if (this.state.username == '') {
            this.setState({ disableDiv12: true })
            rr++
        } else {
            this.setState({ disableDiv12: false })
        }
        if (this.state.password == '') {
            this.setState({ disableDiv13: true })
            rr++
        } else {
            this.setState({ disableDiv13: false })
        }
        if (this.state.email_user == '') {
            this.setState({ disableDiv14: true })
            rr++
        } else {
            this.setState({ disableDiv14: false })
        }
        if (this.state.card_number == '') {
            this.setState({ disableDiv15: true })
            rr++
        } else {
            this.setState({ disableDiv15: false })
        }
        if (this.state.tel_user == '') {
            this.setState({ disableDiv16: true })
            rr++
        } else {
            this.setState({ disableDiv16: false })
        }
        if (this.state.d1 == '' || this.state.m1 == '' || this.state.y1 == '') {
            this.setState({ disableDiv17: true })
            rr++
        } else {
            this.setState({ disableDiv17: false })
        }
        if (this.state.formData.file == '') {
            this.setState({ disableDiv18: true })
            rr++
        } else {
            this.setState({ disableDiv18: false })
        }
        return rr;
    }
    componentWillMount() {
        date = <>{date}<option value='วัน'>วัน</option></>
        y = <>{y}<option value="ปี">ปี</option></>
        for (let index = 1; index <= 31; index++) {
            date = <>{date}<option value={index}>{index}</option></>
        }
        let y1 = new Date().getFullYear()
        for (let in1 = y1; in1 >= 1900; in1--) {
            y = <>{y}<option value={in1}>{in1}</option></>
        }
        axios.get(ROOT_API+'/api/users').then(Response => {
            this.setState({ usernameC: Response.data })
            //(Response.data)
        }).then(error => {   });
    }
    handlename_userChange(e) {
        this.setState({ disableDiv11: false })
        this.setState({
            name_user: e.target.value
        });
    }
    handlecard_numberChange(e) {
        this.setState({ disableDiv15: false })
        this.setState({
            card_number: e.target.value
        });
    }
    handleusernameChange(e) {
        this.setState({ disableDiv12: false })
        let dd = this.state.usernameC.length
        let ff = 0;
        for (let index = 0; index < dd; index++) {
            if (this.state.usernameC[index].username == e.target.value) {
                ff++
            }
        }
        if (ff > 0) {
            this.setState({
                disableDiv: false, disableDiv2: true,
            });
        } else {
            this.setState({
                disableDiv: true, disableDiv2: false,
            });
        }
        if (e.target.value == '') {
            this.setState({
                disableDiv: false, disableDiv2: false,
            });
        }
        this.setState({
            username: e.target.value
        });
    }
    handleemail_userChange(e) {
        this.setState({ disableDiv14: false })
        if (hasSpecial(e.target.value) && hasSpecial2(e.target.value)) {
            this.setState({ disableDiv5: true, disableDiv6: false, })
        } else {
            this.setState({ disableDiv5: false, disableDiv6: true, })
        }
        this.setState({
            email_user: e.target.value
        });
    }
    handletel_userChange(e) {
        this.setState({ disableDiv16: false })
        this.setState({
            tel_user: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        //(this.check())
        if (this.check() == 0) {
            if (this.state.disableDiv == true && this.state.disableDiv3 == true && this.state.disableDiv5 == true) {
                //(this.state)
                axios.post(ROOT_API+'/api/users?name_user=' + this.state.name_user
                    + '&card_number=' + this.state.card_number
                    + '&username=' + this.state.username
                    + '&password=' + this.state.password
                    + '&email_user=' + this.state.email_user
                    + '&tel_user=' + this.state.tel_user
                    + '&type_user=' + this.state.type_user
                    + '&date_birth=' + this.state.y1 + "-" + this.state.m1 + "-" + this.state.d1,
                    this.state.formData
                ).then(Response => {
                    //(Response);
                    alert('insert sucsess !!');
                    this.props.history.push('/Signin')
                }).then(error => {
                     
                });
            }
        }


    }
    handlePasswordChanges(event) {
        this.setState({ disableDiv13: false })
        this.setState({ password: event.target.value });
    }
    datee(data) {
        this.setState({ startDate: data })
    }
    checkpass(e) {
        if (e.target.value == this.state.password) {
            this.setState({
                disableDiv3: true, disableDiv4: false,
            })
        } else {
            this.setState({
                disableDiv3: false, disableDiv4: true,
            })
        }
    }
    img(e) {
        this.setState({ disableDiv18: false })
        let files = e.target.files;

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (e) => {
            console.warn("img data ", e.target.result)
            this.state.formData.file = e.target.result
            console.warn("formdata", this.state.formData)
        }
        reader.onloadend = (e) => {
            this.setState({
                imgSrc: [reader.result]
            })
        }
    }
    dated(e) {
        this.setState({ disableDiv17: false })
        this.setState({ d1: e.target.value })
    }
    datem(e) {
        this.setState({ disableDiv17: false })
        this.setState({ m1: e.target.value })
    }
    datey(e) {
        this.setState({ disableDiv17: false })
        this.setState({ y1: e.target.value })
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
        }; var divStyle5 = {
            display: this.state.disableDiv5 ? 'block' : 'none'
        }; var divStyle6 = {
            display: this.state.disableDiv6 ? 'block' : 'none'
        }; var divStyle11 = {
            display: this.state.disableDiv11 ? 'block' : 'none'
        }; var divStyle12 = {
            display: this.state.disableDiv12 ? 'block' : 'none'
        }; var divStyle13 = {
            display: this.state.disableDiv13 ? 'block' : 'none'
        }; var divStyle14 = {
            display: this.state.disableDiv14 ? 'block' : 'none'
        }; var divStyle15 = {
            display: this.state.disableDiv15 ? 'block' : 'none'
        }; var divStyle16 = {
            display: this.state.disableDiv16 ? 'block' : 'none'
        }; var divStyle17 = {
            display: this.state.disableDiv17 ? 'block' : 'none'
        }; var divStyle18 = {
            display: this.state.disableDiv18 ? 'block' : 'none'
        };
        return (
            <div >
                 <Header/>
                <form onSubmit={this.handleSubmit.bind(this)} >
                    <br />
                    <br />

                    <Container >
                        <Row>
                            <Col>
                                <Card style={{ width: 'auto' }}>
                                    <Card.Body>
                                        <Card.Title><h1>Register</h1></Card.Title>
                                        <input type="text" className="form-control" placeholder="ชื่อ-สกุล"
                                            onChange={this.handlename_userChange.bind(this)} maxLength="100"
                                            value={this.state.name_user} />
                                        <Alert style={divStyle11} key='11' variant='danger'>
                                            ชื่อนี้มีอยู่แล้ว
                                        </Alert>
                                        <input type="text" className="form-control" placeholder="ชื่อผู้ใช้"
                                            onChange={this.handleusernameChange.bind(this)}
                                            value={this.state.username} />
                                        <Alert style={divStyle} key='success' variant='success'>
                                            สามารถใช้ชื้อนี้ได้
                                        </Alert>
                                        <Alert style={divStyle2} key='danger' variant='danger'>
                                            ชื่อนี้มีอยู่แล้ว
                                        </Alert>
                                        <Alert style={divStyle12} key='12' variant='danger'>
                                            ชื่อนี้มีอยู่แล้ว
                                        </Alert>
                                        <p className="App-intro">
                                            <PasswordInput
                                                value={this.state.password}
                                                placeholder='รหัสผ่าน'
                                                handleChanges={this.handlePasswordChanges}
                                            />
                                        </p>
                                        {/* <input type="text" className="form-control" placeholder="password"
                                            onChange={this.handlepasswordChange.bind(this)}
                                            value={this.state.password} /> */}
                                        <input type="password" className="form-control"
                                            onChange={this.checkpass.bind(this)}
                                            placeholder="กรอกรหัสผ่านอีกครั้ง" />
                                        <Alert style={divStyle3} key='success1' variant='success'>
                                            รหัสผ่านถูกต้อง
                                        </Alert>
                                        <Alert style={divStyle4} key='danger1' variant='danger'>
                                            รหัสผ่านไม่ถูกต้อง
                                        </Alert>
                                        <Alert style={divStyle13} key='13' variant='danger'>
                                            ชื่อนี้มีอยู่แล้ว
                                        </Alert>
                                        <input type="text" className="form-control" placeholder="อีเมลล์"
                                            onChange={this.handleemail_userChange.bind(this)}
                                            value={this.state.email_user} />
                                        <Alert style={divStyle5} key='success2' variant='success'>
                                            สามารถใช้อีเมลล์นี้ได้
                                        </Alert>
                                        <Alert style={divStyle6} key='danger2' variant='danger'>
                                            อีเมลล์ไม่ถูกต้อง
                                        </Alert>
                                        <Alert style={divStyle14} key='14' variant='danger'>
                                            ชื่อนี้มีอยู่แล้ว
                                        </Alert>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{ width: 'auto' }}>
                                    <Card.Body>
                                        <input type="text" className="form-control" placeholder="รหัสประจำตัวประชาชน"
                                            onChange={this.handlecard_numberChange.bind(this)} maxLength="13"
                                            value={this.state.card_number} />
                                        <Alert style={divStyle15} key='15' variant='danger'>
                                            ชื่อนี้มีอยู่แล้ว
                                        </Alert>
                                        <input type="text" className="form-control" placeholder="เบอร์โทร"
                                            onChange={this.handletel_userChange.bind(this)} maxLength="10"
                                            value={this.state.tel_user} />
                                        <Alert style={divStyle16} key='16' variant='danger'>
                                            ชื่อนี้มีอยู่แล้ว
                                        </Alert>
                                        <Row>
                                            <Col>
                                                <select onChange={this.dated.bind(this)} className="form-control">
                                                    {date}
                                                </select>
                                            </Col>
                                            <Col>
                                                <select onChange={this.datem.bind(this)} className="form-control">
                                                    {m.map(m =>
                                                        <option value={m.d}>{m.m}</option>
                                                    )}
                                                </select>
                                            </Col>
                                            <Col>
                                                <select onChange={this.datey.bind(this)} className="form-control">
                                                    {y}
                                                </select>
                                            </Col>
                                        </Row>
                                        <Alert style={divStyle17} key='17' variant='danger'>
                                            ชื่อนี้มีอยู่แล้ว
                                        </Alert>
                                        <Image src={this.state.imgSrc} height="100" width="100" /><br />
                                        <input className="form-control" type="file" name="file" onChange={this.img.bind(this)} />
                                        <Alert style={divStyle18} key='18' variant='danger'>
                                            ชื่อนี้มีอยู่แล้ว
                                        </Alert>
                                        
                                        <Button className="btnregis" type="submit" >Sign up</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </form>
                <br />
                <br />
                <Footer/>
            </div>
        )
    }
}
export default Register