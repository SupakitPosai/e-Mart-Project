import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import axios from 'axios';
import ROOT_API from '../../config/API'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navbar.css';
import { Navbar, Nav } from 'react-bootstrap';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { FaUserSecret, FaProductHunt } from "react-icons/fa";
import {FiLogOut } from "react-icons/fi";
import { GoDashboard } from "react-icons/go";
import { MdPayment ,MdImportContacts } from "react-icons/md";
import { IoMdContacts } from "react-icons/io";
import { TiContacts } from "react-icons/ti";
export default class Navbar1 extends Component {
    constructor() {
        super();
        this.state = {
            post: {}, pay: 0
        }
    }

    componentDidMount() {

        const cookies = new Cookies();


        axios.get(ROOT_API + "/api/users/" + cookies.get('ID_Login')).then(response => {
            this.setState({ post: response.data });
        }).catch(error => {});
        axios.delete(ROOT_API + "/api/count/1").then(response => {
            this.setState({ pay: response.data });
        }).catch(error => {});

    }
    render() {
        const cookies = new Cookies();
        let container = {
            width: '130px',
        }

        return (
            <div>

                <Nav className="flex-column nav1" style={{ padding: '25px' }}>
                    <h3><FaUserSecret /> : {this.state.post.name_user}</h3>
                    <h6> <hr className="hrnav" /></h6>
                    <Link className="nav2" to="/Admin"><GoDashboard /> Dashboard</Link>

                    <Link className="nav2" to="/TypeAdmin"><FaProductHunt /> Add Type Product</Link>
                    <h6> <hr className="hrnav" /></h6>
                    <Link className="nav2" to="/Paymentmethod"><MdPayment /> Payment method</Link>

                    <div style={container}>
                        <Link className="nav2" to="/PaymentAdmin">
                            <NotificationBadge count={this.state.pay} effect={Effect.SCALE} />
                            <MdPayment /> Payment
                        </Link>
                    </div>
                    <h6> <hr className="hrnav" /></h6>
                    <Link className="nav2" to="/AboutUs"><TiContacts/> About us</Link>

                    <Link className="nav2" to="/ContactUs"><IoMdContacts/> Contact us</Link>

                    <Link className="nav2" to="/Policy"><MdImportContacts/> Policy</Link>
                    <h6> <hr className="hrnav" /></h6>
                    <Link className="nav2" to="/Signin"><FiLogOut/> Log out</Link>
                </Nav>

            </div>
        );
    }
}
