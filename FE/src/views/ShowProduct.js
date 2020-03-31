import React, { Component } from 'react';

import axios from 'axios';
import ROOT_API from '../config/API'
import URL_img from '../config/URL_img'
import Header from '../components/header';
import Footer from '../components/Footer';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col, Image, Nav, Card, Button, Modal, Carousel } from 'react-bootstrap';
import Select from 'react-select';
import { FaPlay, FaFilter } from "react-icons/fa";

import '../css/show.css'
const order1 = [
    { 'label': 'ราคาจากต่ำไปสูง', 'value': 'ร,asc' }, { 'label': 'ราคาจากสูงไปต่ำ', 'value': 'ร,desc' },
    { 'label': 'ชื่อสินค้า ก - ฮ', 'value': 'ช,asc' }, { 'label': 'ชื่อสินค้า ฮ - ก', 'value': 'ช,desc' }
]

// window.onscroll = function () { scrollFunction() };
// function scrollFunction() {
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//         //('object',document.body.scrollTop,document.documentElement.scrollTop)
//     } 
// }
export default class ShowProduct extends Component {
    constructor(prods) {
        super(prods);
        this.state = {
            prods: [],
            prodDiv: [],
            search: '',
            pricemin_product: '',
            pricemax_product: '',
            orderbyprice: '',
            orderbyname: '', select: '',
            typeproduct: '',
            types: [],
            divtype: [], show: false
        }
    }
    componentDidMount() {
        const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        var qproduct = ''
        var search1 = ''
        if (params.get('product') != null) {
            qproduct = params.get('product'); // bar
        }
        if (params.get('s') != null) {
            search1 = params.get('s'); // bar
        }

        //('search1', search1)
        this.setState({ typeproduct: qproduct, search: search1 })
        axios.get(ROOT_API + "/api/search?search=" + search1 +
            "&pricemin_product=&pricemax_product=&orderbyprice=&orderbyname="
            + "&typeproduct=" + qproduct).then(response => {
                this.setState({ prods: response.data });
                //(response.data)
                const id_product1 = this.state.prods.map(prod => prod.id_product);
                const name_product1 = this.state.prods.map(prod => prod.name_product);
                const price_product1 = this.state.prods.map(prod => prod.price_product);
                const id_type_product1 = this.state.prods.map(prod => prod.id_type_product);
                const img_product = this.state.prods.map(prod => prod.img_product);
                for (let index = 0; index < id_product1.length; index++) {
                    this.setState({
                        prodDiv: [...this.state.prodDiv, {
                            'id': id_product1[index],
                            'src': URL_img + img_product[index],
                            'name': name_product1[index],
                            'price': price_product1[index]
                        }]
                    })
                }
            }).catch(error => {});
        axios.get(ROOT_API + '/api/type_product').then(response => {
            this.setState({
                types: response.data
            });
            const level_type1 = this.state.types.map(type => type.level_type);
            const id_type1 = this.state.types.map(type => type.id_type);
            const name_type1 = this.state.types.map(type => type.name_type);
            const status_type1 = this.state.types.map(type => type.status_type);
            const img_type1 = this.state.types.map(type => type.img_type);
            //(id_type1.length)
            for (let index = 1; index < level_type1.length; index++) {
                if (level_type1[index] == 1) {
                    for (let index1 = 0; index1 < level_type1.length; index1++) {
                        if (id_type1[index] == level_type1[index1]) {
                            for (let index2 = 0; index2 < level_type1.length; index2++) {
                                if (id_type1[index1] == level_type1[index2]) {
                                    this.setState({
                                        divtype: [...this.state.divtype, {
                                            "id": id_type1[index2],
                                            "name": name_type1[index2]
                                        }]
                                    })
                                }
                            }
                        }
                    }
                }
            }

            //('s1s', this.state.s1s);
        }).catch(error => {
             
        })
    }
    orderby(value) {
        this.setState({ select: value.label })
        var p = value.value.split(",");
        if (p[0] == 'ร') {
            this.setState({ orderbyprice: p[1] })
            axios.get(ROOT_API + "/api/search/1?search=" + this.state.search +
                "&pricemin_product=" + this.state.pricemin_product +
                "&pricemax_product=" + this.state.pricemax_product +
                "&orderbyprice=" + p[1] +
                "&orderbyname=" +
                "&typeproduct=" + this.state.typeproduct).then(response => {
                    this.setState({ prods: response.data });
                    //(p[0])
                    const id_product1 = this.state.prods.map(prod => prod.id_product);
                    const name_product1 = this.state.prods.map(prod => prod.name_product);
                    const price_product1 = this.state.prods.map(prod => prod.price_product);
                    const id_type_product1 = this.state.prods.map(prod => prod.id_type_product);
                    const img_product = this.state.prods.map(prod => prod.img_product);
                    this.setState({ prodDiv: [] })
                    for (let index = 0; index < id_product1.length; index++) {
                        this.setState({
                            prodDiv: [...this.state.prodDiv, {
                                'id': id_product1[index],
                                'src': URL_img + img_product[index],
                                'name': name_product1[index],
                                'price': price_product1[index]
                            }]
                        })
                    }
                }).catch(error => {});

        } else {
            this.setState({ orderbyname: p[1] })
            axios.get(ROOT_API + "/api/search/1?search=" + this.state.search +
                "&pricemin_product=" + this.state.pricemin_product +
                "&pricemax_product=" + this.state.pricemax_product +
                "&orderbyprice=" +
                "&orderbyname=" + p[1] +
                "&typeproduct=" + this.state.typeproduct).then(response => {
                    this.setState({ prods: response.data });
                    //(p[0])
                    const id_product1 = this.state.prods.map(prod => prod.id_product);
                    const name_product1 = this.state.prods.map(prod => prod.name_product);
                    const price_product1 = this.state.prods.map(prod => prod.price_product);
                    const id_type_product1 = this.state.prods.map(prod => prod.id_type_product);
                    const img_product = this.state.prods.map(prod => prod.img_product);
                    this.setState({ prodDiv: [] })
                    for (let index = 0; index < id_product1.length; index++) {
                        this.setState({
                            prodDiv: [...this.state.prodDiv, {
                                'id': id_product1[index],
                                'src': URL_img + img_product[index],
                                'name': name_product1[index],
                                'price': price_product1[index]
                            }]
                        })
                    }
                }).catch(error => {});
        }
    }
    clicktype(e) {
        this.setState({ pricemin_product: '', pricemax_product: '', select: '' })
        this.setState({ typeproduct: e.target.id })
        axios.get(ROOT_API + "/api/search?search=" + this.state.search +
            "&pricemin_product=&pricemax_product=&orderbyprice=&orderbyname="
            + "&typeproduct=" + e.target.id).then(response => {
                this.setState({ prods: response.data });
                //(this.state.typeproduct)
                const id_product1 = this.state.prods.map(prod => prod.id_product);
                const name_product1 = this.state.prods.map(prod => prod.name_product);
                const price_product1 = this.state.prods.map(prod => prod.price_product);
                const id_type_product1 = this.state.prods.map(prod => prod.id_type_product);
                const img_product = this.state.prods.map(prod => prod.img_product);
                this.setState({ prodDiv: [] })
                for (let index = 0; index < id_product1.length; index++) {
                    this.setState({
                        prodDiv: [...this.state.prodDiv, {
                            'id': id_product1[index],
                            'src': URL_img + img_product[index],
                            'name': name_product1[index],
                            'price': price_product1[index]
                        }]
                    })
                }
            }).catch(error => {});
    }
    min(e) {
        this.setState({ pricemin_product: e.target.value })
    }
    max(e) {
        this.setState({ pricemax_product: e.target.value })
    }
    clickprice() {

        axios.post(ROOT_API + "/api/search?search=" + this.state.search +
            "&pricemin_product=" + this.state.pricemin_product +
            "&pricemax_product=" + this.state.pricemax_product +
            "&orderbyprice=" + this.state.orderbyprice +
            "&orderbyname=" + this.state.orderbyname +
            "&typeproduct=" + this.state.typeproduct).then(response => {
                this.setState({ prods: response.data });
                //(this.state.typeproduct)
                const id_product1 = this.state.prods.map(prod => prod.id_product);
                const name_product1 = this.state.prods.map(prod => prod.name_product);
                const price_product1 = this.state.prods.map(prod => prod.price_product);
                const id_type_product1 = this.state.prods.map(prod => prod.id_type_product);
                const img_product = this.state.prods.map(prod => prod.img_product);
                this.setState({ prodDiv: [] })
                for (let index = 0; index < id_product1.length; index++) {
                    this.setState({
                        prodDiv: [...this.state.prodDiv, {
                            'id': id_product1[index],
                            'src': URL_img + img_product[index],
                            'name': name_product1[index],
                            'price': price_product1[index]
                        }]
                    })
                }
            }).catch(error => {});
    }
    handleClose() {
        this.setState({ show: false })
    }
    showm() {
        this.setState({ show: true })
    }
    render() {
        return (
            <div>
                <button id="myBtn" title="Go to top" onClick={this.showm.bind(this)}><FaFilter /></button>
                <Modal show={this.state.show} onHide={this.handleClose.bind(this)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>กรองสินค้า : </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Container>
                            <Row>
                                <Col><h4>หมวดหมู่ :</h4></Col>
                            </Row>

                            {this.state.divtype.map(dt =>
                                <Row>
                                    <Col>
                                        <a className="aa" href="##"
                                        >
                                            <h5 id={dt.id}
                                                onClick={this.clicktype.bind(this)}>{dt.name}
                                            </h5>
                                        </a>
                                    </Col>
                                </Row>
                            )}
                            <hr />
                            <Row>
                                <Col><h4>ราคา :</h4></Col>
                            </Row>
                            <Row>
                                <Col style={{ padding: '0', marginLeft: '1rem' }} >
                                    <input type="text" className="form-control maxi"
                                        onChange={this.min.bind(this)}
                                        value={this.state.pricemin_product}
                                        placeholder="ต่ำสุด" />
                                </Col>
                                <Col style={{ padding: '0', textAlign: 'center' }}><h5>-</h5></Col>
                                <Col style={{ padding: '0', marginRight: '1rem' }}>
                                    <input type="text" className="form-control maxi"
                                        value={this.state.pricemax_product}
                                        onChange={this.max.bind(this)}
                                        placeholder="สูงสุด"
                                    />
                                </Col>
                                <Col style={{ padding: '0' }}>
                                    <Button className="btn_r" onClick={this.clickprice.bind(this)} ><FaPlay /></Button>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col><h4>เรียงตาม :</h4></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Select onChange={this.orderby.bind(this)}
                                        options={order1} defaultValue={this.state.select}
                                    />
                                </Col>
                            </Row>
                        </Container>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btnbuy" onClick={this.handleClose.bind(this)}>
                            Close
            </Button>
                        <Button className="btnbuy" onClick={this.handleClose.bind(this)}>
                            ยืนยัน
            </Button>
                    </Modal.Footer>
                </Modal>
                <Header />
                <Container>
                    <hr />
                    <Row className="showPD">

                        <Col sm={3}>
                            <Row>
                                <Col>
                                    <Card>
                                        <Container>
                                            <Row>
                                                <Col><h4>หมวดหมู่ :</h4></Col>
                                            </Row>

                                            {this.state.divtype.map(dt =>
                                                <Row>
                                                    <Col>
                                                        <a className="aa" href="##"
                                                        >
                                                            <h5 id={dt.id}
                                                                onClick={this.clicktype.bind(this)}>{dt.name}
                                                            </h5>
                                                        </a>
                                                    </Col>
                                                </Row>
                                            )}
                                            <hr />
                                            <Row>
                                                <Col><h4>ราคา :</h4></Col>
                                            </Row>
                                            <Row>
                                                <Col style={{ padding: '0', marginLeft: '1rem' }} >
                                                    <input type="text" className="form-control maxi"
                                                        onChange={this.min.bind(this)}
                                                        value={this.state.pricemin_product}
                                                        placeholder="ต่ำสุด" />
                                                </Col>
                                                <Col style={{ padding: '0', textAlign: 'center' }}><h5>-</h5></Col>
                                                <Col style={{ padding: '0', marginRight: '1rem' }}>
                                                    <input type="text" className="form-control maxi"
                                                        value={this.state.pricemax_product}
                                                        onChange={this.max.bind(this)}
                                                        placeholder="สูงสุด"
                                                    />
                                                </Col>
                                                <Col style={{ padding: '0' }}>
                                                    <Button className="btn_r" onClick={this.clickprice.bind(this)} ><FaPlay /></Button>
                                                </Col>
                                            </Row>
                                            <hr />
                                            <Row>
                                                <Col><h4>เรียงตาม :</h4></Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Select onChange={this.orderby.bind(this)}
                                                        options={order1} defaultValue={this.state.select}
                                                    />
                                                </Col>
                                            </Row>
                                        </Container>
                                        <br /><br />
                                    </Card>
                                </Col>
                            </Row>
                        </Col>

                        <Col sm={9}>
                            <Row><Col><p className="Srearch1">คำค้นหา : {this.state.search}</p></Col></Row>
                            <Row>
                                {this.state.prodDiv.map(pr =>
                                    <Col sm={3}>
                                        <Link className="aa" to={'/DTProduct?dt=' + pr.id} >
                                            <Card style={{ padding: '0' }}>
                                                <Card.Img variant="top" src={pr.src} />
                                                <div style={{ padding: '0.7rem' }}>
                                                    <h3 className="nameCut namePro"> {pr.name}</h3>
                                                    <h2 className="titlecart pricePro nameCut">{pr.price} THB</h2>
                                                </div>

                                            </Card>
                                        </Link>
                                    </Col>
                                )}


                            </Row>

                        </Col>
                    </Row>
                    <Row className="showPM">
                        <Col>
                            <Row><Col><p className="Srearch1">คำค้นหา : {this.state.search}</p></Col></Row>
                            <Row>
                                {this.state.prodDiv.map(pr =>
                                    <Col sm={3}>
                                        <Link className="aa" to={'/DTProduct?dt=' + pr.id} >
                                            <Card style={{ padding: '0' }}>
                                                <Card.Img variant="top" src={pr.src} />
                                                <div style={{ padding: '0.7rem' }}>
                                                    <h3 className="nameCut namePro"> {pr.name}</h3>
                                                    <h2 className="titlecart pricePro nameCut">{pr.price} THB</h2>
                                                </div>

                                            </Card>
                                        </Link>
                                    </Col>
                                )}


                            </Row>

                        </Col>
                    </Row>
                    <Row className="showPMS">
                        <Col>
                            <Row><Col><p className="Srearch1">คำค้นหา : {this.state.search}</p></Col></Row>
                            <Row>
                                {this.state.prodDiv.map(pr =>
                                    <Col >
                                        <Link className="aa" to={'/DTProduct?dt=' + pr.id} >
                                            <Card style={{ padding: '0', width: '10rem' }}>
                                                <Card.Img variant="top" src={pr.src} />
                                                <div style={{ padding: '0.7rem' }}>
                                                    <h3 className="nameCut namePro"> {pr.name}</h3>
                                                    <h2 className="titlecart pricePro nameCut">{pr.price} THB</h2>
                                                </div>

                                            </Card>
                                        </Link>
                                    </Col>
                                )}


                            </Row>

                        </Col>
                    </Row>
                    <Row className="showPMSS">
                        <Col>
                            <Row><Col><p className="Srearch1">คำค้นหา : {this.state.search}</p></Col></Row>
                            <Row>
                                {this.state.prodDiv.map(pr =>
                                    <Col style={{ paddingRight: '0', paddingLeft: '10px' }}>
                                        <Link className="aa" to={'/DTProduct?dt=' + pr.id} >
                                            <Card style={{ padding: '0', width: '8rem' }}>
                                                <Card.Img variant="top" src={pr.src} />
                                                <div style={{ padding: '0.7rem' }}>
                                                    <h3 className="nameCut namePro"> {pr.name}</h3>
                                                    <h2 className="titlecart pricePro nameCut">{pr.price} THB</h2>
                                                </div>

                                            </Card>
                                        </Link>
                                    </Col>
                                )}


                            </Row>

                        </Col>
                    </Row>
                </Container>

                <Footer />
            </div>
        );
    }
}