import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import ROOT_API from '../config/API'
import '../css/signin.css'
import Cookies from 'universal-cookie';
import Header from '../components/header';
import Footer from '../components/Footer';
import {
    Button, Container, Col, Row
} from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Signin1 from '../img/Signin.jpg'
class Signin extends Component {

    constructor() {
        super();
        this.state = {
            userss: [],
            username: '',
            password: '',
            post: {}

        }
        const cookies = new Cookies();
        cookies.remove('ID_Login', { path: '/' })
        cookies.remove('Type_Login', { path: '/' })
        cookies.remove('ID_Shop', { path: '/' })

    }


    componentWillMount() {

        axios.get(ROOT_API + '/api/users').then(response => {
            this.setState({
                userss: response.data
            });

        }).catch(error => {

        })


    }
    // componentDidMount(){
    //     axios.get(ROOT_API+"/api/users/1").then(response => {
    //         this.setState({post : response.data });
    //     }).catch(error => {});

    // }


    // this.state.userss.map(users => {users.id} )

    handleusernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }
    handlepasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const cookies = new Cookies();
        var slogin = 0;
        // //("user : " + this.state.username + " psw: " + this.state.password);
        const username1 = this.state.userss.map(users => users.username);
        const psw1 = this.state.userss.map(users => users.password);
        const type1 = this.state.userss.map(users => users.type_user);
        const id1 = this.state.userss.map(users => users.id);
        for (let index = 0; index < username1.length; index++) {
            if (username1[index] == this.state.username && psw1[index] == this.state.password) {
                if (type1[index] == "admin") {
                    // //("username1[" + index + "]" + username1[index]);
                    // //("psw1[" + index + "]" + psw1[index]);
                    // //("type1[" + index + "]" + type1[index]);
                    // //("login succe");
                    cookies.set('ID_Login', id1[index], { path: '/' });
                    cookies.set('Type_Login', type1[index], { path: '/' });
                    //(cookies.get('ID_Login'));
                    //(cookies.get('Type_Login'));
                    this.props.history.push('/Admin')

                } else {
                    //("username1[" + index + "]" + username1[index]);
                    //("psw1[" + index + "]" + psw1[index]);
                    //("type1[" + index + "]" + type1[index]);
                    //("login succe");
                    cookies.set('ID_Login', id1[index], { path: '/' });
                    cookies.set('Type_Login', type1[index], { path: '/' });
                    //(cookies.get('ID_Login'));
                    //(cookies.get('Type_Login'));
                    this.props.history.push('/')
                }


            } else {
                slogin++;
            }
            if (slogin == username1.length) {
                alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
            }

        }
    }
    responseFacebook(response) {
        console.log(response)
        const cookies = new Cookies();
        //(response);
        var id = response.id
        var name = response.name
        var email = response.email
        var img = response.picture.data.url

        axios.get(ROOT_API + '/api/social?id_social=' + response.id).then(response => {

            if (response.data != '') {
                cookies.set('ID_Login', response.data.id, { path: '/' });
                cookies.set('Type_Login', 'user', { path: '/' });
                this.props.history.push('/')
            } else {
                const dddt = {
                    "name_user": name,
                    "email_user": email,
                    "img_path": img,
                    "id_facebook": id
                }
                axios.post(ROOT_API + '/api/social', dddt
                ).then(response => {
                    axios.get(ROOT_API + '/api/social?id_social=' + id).then(response => {
                        cookies.set('ID_Login', response.data.id, { path: '/' });
                        cookies.set('Type_Login', 'user', { path: '/' });
                        this.props.history.push('/')
                    }).catch(error => {   })
                }).catch(error => {   })
            }
        }).catch(error => {   })
    }
    responseGoogle(response) {
        // console.log('object', response)
        // (response.profileObj);
        const cookies = new Cookies();

        var id = response.profileObj.googleId
        var name = response.profileObj.name
        var email = response.profileObj.email
        var img = response.profileObj.imageUrl

        axios.get(ROOT_API + '/api/social?id_social=' + response.profileObj.googleId).then(response => {

            if (response.data != '' && response.data != undefined) {
                cookies.set('ID_Login', response.data.id, { path: '/' });
                cookies.set('Type_Login', 'user', { path: '/' });
                this.props.history.push('/')
            } else {
                const dddt = {
                    "name_user": name,
                    "email_user": email,
                    "img_path": img,
                    "id_google": id
                }
                //('dddt', dddt)
                axios.get(ROOT_API + '/api/social/1?name_user=' + name +
                    '&email_user=' + email + '&img_path=' + img +
                    '&id_google=' + id
                ).then(response => {
                    //(response.data)
                    axios.get(ROOT_API + '/api/social?id_social=' + id).then(response => {

                        cookies.set('ID_Login', response.data.id, { path: '/' });
                        cookies.set('Type_Login', 'user', { path: '/' });
                        this.props.history.push('/')
                    }).catch(error => { })
                }).catch(error => { })
            }
        }).catch(error => { })
    }


    render() {
        return (<div style={{ backgroundColor: '#F7F7F7' }}>
            <Header />
            <Container>
                <Row>
                    <Col sm={6}>
                        <img src={Signin1} width="100%" />

                    </Col>
                    <Col sm={6}>
                        <Row>
                            <Col>
                                <h1 style={{ textAlign: 'center', marginTop: '10px' }}>Sign In</h1>
                                <hr />

                                <form onSubmit={this.handleSubmit.bind(this)} >
                                    <input type="text" className="form-control" placeholder="username"
                                        onChange={this.handleusernameChange.bind(this)}
                                        value={this.state.username}
                                    />
                                    <input type="password" className="form-control" placeholder="password"
                                        onChange={this.handlepasswordChange.bind(this)}
                                        value={this.state.password}
                                    /> <Button className="btnsignin" type="submit" style={{ marginBottom: '10px' }}>SIGN IN</Button>
                                </form>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6} style={{ marginBottom: '10px' }}>
                                <FacebookLogin
                                    appId="816544092116474"  //APP ID NOT CREATED YET
                                    fields="name,email,picture,location ,age_range,birthday,link"
                                    scope="public_profile, email,user_birthday,user_age_range,user_link,user_location,user_age_range"
                                    callback={this.responseFacebook.bind(this)}
                                    // cssClass="my-facebook-button-class"
                                    icon="fa-facebook"
                                />
                            </Col>
                            <Col sm={6} style={{ marginBottom: '10px' }}>
                                <GoogleLogin
                                    className="GoogleLogin"
                                    clientId="590470975835-p3hr6qvp0ee27lbp4fdoruoe5aofkmnc.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                                    buttonText="LOGIN WITH GOOGLE"
                                    scope="profile email"
                                    cookiePolicy={'single_host_origin'}
                                    responseType="permission"
                                    onSuccess={this.responseGoogle.bind(this)}
                                    onFailure={this.responseGoogle.bind(this)}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Container>
            <Footer />
        </div>
        );


    }
}
export default Signin

