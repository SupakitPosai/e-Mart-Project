import React, { Component } from 'react';
 
import ReactDOM from 'react-dom';
import axios from 'axios';
import ROOT_API from '../config/API'
import URL_img from '../config/URL_img'
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col, Image, Nav, Card, Button, Modal, Carousel } from 'react-bootstrap';
export default class Showall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prods: [],
            prodDiv: ''
        }
    }
    componentDidMount() {
//('rrrr',this.props.match.params.id)
        // axios.get(ROOT_API + "/api/product/").then(response => {
        //     this.setState({ prods: response.data });
        //     const id_product1 = this.state.prods.map(prod => prod.id_product);
        //     const name_product1 = this.state.prods.map(prod => prod.name_product);
        //     const price_product1 = this.state.prods.map(prod => prod.price_product);
        //     const img_product = this.state.prods.map(prod => prod.img_product);
        //     for (let index = 0; index < id_product1.length; index++) {
        //         this.setState({
        //             prodDiv: <>{this.state.prodDiv}
        //                 <Col sm={3}>
        //                     <Link className="aa" to={'/DTProduct?dt=' + id_product1[index]} > <Card>
        //                         <Card.Img variant="top" src={URL_img + img_product[index]} />
        //                         <Card.Body>

        //                             <Card.Text>
        //                                 {name_product1[index]}
        //                             </Card.Text>
        //                             <Card.Title className="titlecart">{price_product1[index]} THB</Card.Title>
        //                             {/* <Button className="btnbuy" >
        //                                 Deteil</Link></Button> */}
        //                         </Card.Body>
        //                     </Card></Link></Col></>
        //         })
        //     }

        // }).catch(error => {});


    }
    render() {
        return (
            <div>
                 
                <Container><h1>Show</h1><hr />
                    <Row>
                        {this.state.prodDiv}
        <h3>{this.props.match.params.id }</h3>
                    </Row>


                </Container>


            </div>
        );
    }
}