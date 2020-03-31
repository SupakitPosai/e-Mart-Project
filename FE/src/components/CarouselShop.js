import React, { Component } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import p1 from '../img/p1.jpg'
import {

    Container,
    Card,
    Button,
} from 'react-bootstrap'
import axios from 'axios';
import ROOT_API from '../config/API'
import URL_img from '../config/URL_img'
import ReactLoading from 'react-loading';
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 6,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
    },
};
export default class CaruoselShop extends Component {
    constructor(props) {
        super(props)

        this.state = {
            prods: [],
            prodDiv: []
        }
    }
    componentWillMount() {
        axios.get(ROOT_API + "/api/shop/").then(response => {
            this.setState({ prods: response.data });
            const id_shop = this.state.prods.map(prod => prod.id_shop);
            const name_shop = this.state.prods.map(prod => prod.name_shop);
            const img_shop = this.state.prods.map(prod => prod.img_shop);
            for (let index = 0; index < id_shop.length; index++) {
                this.setState({
                    prodDiv: [...this.state.prodDiv, {
                        "id": id_shop[index],
                        "src": URL_img + img_shop[index],
                        "name": name_shop[index],
                    }]
                })
            }

        }).catch(error => {});
    }
    render() {
        let ee = this.state.prodDiv.length
        if (ee != 0) {
            return (
                <div>
                    <Carousel responsive={responsive}>
                        {this.state.prodDiv.map(prodd =>
                            <div>
                                <Container>
                                    <Link className="aa" to={'/Shop?n=' + prodd.id} >
                                        <Card className="text-center" style={{ padding: '0'}}>
                                            <Card.Img variant="top" src={prodd.src} />
                                            <div style={{ padding: '0.7rem' }}>
                                                <h3 className="nameCut namePro"> {prodd.name}</h3>
                                            </div>

                                        </Card>
                                    </Link>
                                </Container>
                            </div>
                        )}


                    </Carousel>
                </div>
            )
        } else {
            return (
                <div className="Load1" >
                    <ReactLoading type="spin" color="#3c6a15" height={'10%'} width={'10%'} />
                </div>
            )
        }

    }
}
