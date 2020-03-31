import React, { Component } from 'react';
// import p1 from '../img/photo.png';
// import { FaBeer, FaEdit } from 'react-icons/fa';
// import { FiSave } from 'react-icons/fi';
// import { MdClose } from 'react-icons/md';
import axios from 'axios';
import ROOT_API from '../config/API'
import URL_img from '../config/URL_img'
import 'bootstrap/dist/css/bootstrap.min.css'
//  
// import { default as NumberFormat } from 'react-number-format';
import Cookies from 'universal-cookie';
import { BrowserRouter as Link } from 'react-router-dom';
// import { HashRouter } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';



class CardProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prosDiv: [], pros1: [], products: [], prosDiv1: [],
            typeps: [], typep1s: [], divtype: [], tt: ''
        };
    }

    componentWillMount() {
        
        this.setState({ tt: this.props.shop, divtype: [], prosDiv: [] })

        const shop = this.props.shop // bar
        axios.get(ROOT_API + '/api/product').then(response => {
            this.setState({
                products: response.data
            });
            
            const id_shop1 = this.state.products.map(product => product.id_shop);
            const id_product1 = this.state.products.map(product => product.id_product);
            const id_type_product = this.state.products.map(product => product.id_type_product);
            const cookies = new Cookies();
            for (let index5 = 0; index5 < id_shop1.length; index5++) {
                if (id_shop1[index5] == shop) {
                    axios.get(ROOT_API + '/api/product/' + id_product1[index5]).then(response => {
                        this.setState({
                            pros1: response.data
                        });
                        const name1 = this.state.pros1[0].name_product
                        const price1 = this.state.pros1[0].price_product

                        
                        this.setState({
                            prosDiv: [...this.state.prosDiv, {
                                'id': id_product1[index5],
                                'src': URL_img + response.data[0].img_product,
                                'name': name1,
                                'price': price1,
                                'id_type': id_type_product[index5]
                            }],
                        });

                    }).catch(error => {
                         
                    })
                }
            }
        }).catch(error => {   })
        axios.put(ROOT_API + '/api/search/1?id_shop=' + shop).then(response => {
            this.setState({ typep1s: response.data });
            let dd = this.state.typep1s.length
            for (let ii1 = 0; ii1 < dd; ii1++) {

                this.setState({
                    divtype: [...this.state.divtype, {
                        "id": this.state.typep1s[ii1].id_type,
                        "name": this.state.typep1s[ii1].name_type,
                        "src": URL_img + response.data[ii1].img_type
                    }]
                })

            }

        }).catch(error => {
             
        });
    }
    componentDidUpdate() {
        if (this.state.tt != this.props.shop) {
         
            this.componentWillMount()
        }
    }
    test() {
        
    }
    clicktype(e) {
        const shop = this.props.shop

        axios.delete(ROOT_API + '/api/search/1?id_shop=' + shop + '&id_type=' + e).then(response => {
            this.setState({ prosDiv1: response.data });
            let dd = this.state.prosDiv1.length
            this.setState({ prosDiv: [] })
            for (let ii1 = 0; ii1 < dd; ii1++) {
                this.setState({
                    prosDiv: [...this.state.prosDiv, {
                        'id': this.state.prosDiv1[ii1].id_product,
                        'src': URL_img + response.data[ii1].img_product,
                        'name': this.state.prosDiv1[ii1].name_product,
                        'price': this.state.prosDiv1[ii1].price_product,
                        'id_type': this.state.prosDiv1[ii1].id_type_product
                    }],
                })
            }

        }).catch(error => {
             
        });

    }

    render() {

        return (
            <div>
                <Container>
                    
                    <div className="CPro">
                        <Row className="TypeCardD" >
                            {this.state.divtype.map(ty =>
                                <Col sm={2} style={{ width: '30%' }} >
                                    <a href="##" className="aa" >
                                        <div id={ty.id} onClick={() => { this.clicktype(ty.id) }} >
                                            <Card key={ty.id} style={{ border: '.5px solid #2222' }}>
                                                <h5 className="nameCut">{ty.name}</h5>
                                            </Card>
                                        </div>

                                    </a>
                                </Col>
                            )}
                        </Row>
                        <Row className="TypeCardM" >
                            {this.state.divtype.map(ty =>
                                <Col sm={2} style={{ width: '40%' }} >
                                    <a href="##" className="aa" >
                                        <div id={ty.id} onClick={() => { this.clicktype(ty.id) }} >
                                            <Card key={ty.id} style={{ border: '.5px solid #2222' }}>
                                                <h5 className="nameCut">{ty.name}</h5>
                                            </Card>
                                        </div>

                                    </a>
                                </Col>
                            )}
                        </Row>
                        <Row className="TypeCardMm">
                            {this.state.divtype.map(ty =>
                                <Col sm={2} style={{ width: '50%' }} >
                                    <a href="##" className="aa" >
                                        <div id={ty.id} onClick={() => { this.clicktype(ty.id) }} >
                                            <Card key={ty.id} style={{ border: '.5px solid #2222' }}>
                                                <h5 className="nameCut">{ty.name}</h5>
                                            </Card>
                                        </div>

                                    </a>
                                </Col>
                            )}
                        </Row>
                    </div>

                    <hr />

                    <Row className="showPD">
                        {this.state.prosDiv.map(pr =>
                            <Col sm={3}>
                                <a className='aa' href={'/DTProduct?dt=' + pr.id} >
                                    <Card style={{ border: '1px solid #2222', padding: '0' }}>
                                        <Card.Img variant="top" src={pr.src} />
                                        <div style={{ padding: '0.7rem' }}>
                                            <h3 className="nameCut namePro"> {pr.name}</h3>
                                            <h2 className="titlecart pricePro nameCut">{pr.price} THB</h2>
                                        </div>
                                    </Card></a>
                            </Col>

                        )}
                    </Row>
                    
                    <Row className="reshowPM">
                        {this.state.prosDiv.map(pr =>
                            <Col sm={3}>
                                <Link className="aa" to={'/DTProduct?dt=' + pr.id} >
                                    <Card style={{ border: '1px solid #2222', padding: '0' }}>
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
                    <Row className="reshowPMS">
                        {this.state.prosDiv.map(pr =>
                            <Col >
                                <Link className="aa" to={'/DTProduct?dt=' + pr.id} >
                                    <Card style={{ border: '1px solid #2222', padding: '0', width: '8.8rem' }}>
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
                    <Row className="reshowPMSS">
                        {this.state.prosDiv.map(pr =>
                            <Col style={{ paddingRight: '0', paddingLeft: '10px' }}>
                                <Link className="aa" to={'/DTProduct?dt=' + pr.id} >
                                    <Card style={{ border: '1px solid #2222', padding: '0', width: '8rem' }}>
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


                </Container>

            </div>
        )
    }
}
export default CardProduct
