import React, { Component } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ROOT_API from '../config/API'
import URL_img from '../config/URL_img'
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import p1 from '../img/p1.jpg'
import './style.css'
import {

    Container,
    Card,
    Button,
} from 'react-bootstrap'
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
export default class CarouselCategory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            types: [],
            divtype: []
        }
    }
    componentWillMount() {
        axios.get(ROOT_API + '/api/type_product').then(response => {
            this.setState({
                types: response.data
            });
            const level_type1 = this.state.types.map(type => type.level_type);
            const id_type1 = this.state.types.map(type => type.id_type);
            const name_type1 = this.state.types.map(type => type.name_type);
            const status_type1 = this.state.types.map(type => type.status_type);
            const img_type1 = this.state.types.map(type => type.img_type);
           
            for (let index = 1; index < level_type1.length; index++) {
                if (level_type1[index] == 1) {
                    for (let index1 = 0; index1 < level_type1.length; index1++) {
                        if (id_type1[index] == level_type1[index1]) {
                            for (let index2 = 0; index2 < level_type1.length; index2++) {
                                if (id_type1[index1] == level_type1[index2]) {
                                    this.setState({
                                        divtype: [...this.state.divtype, {
                                            "id": id_type1[index2],
                                            "src": URL_img + img_type1[index2],
                                            "name": name_type1[index2]
                                        }]
                                    })
                                }
                            }
                        }
                    }
                }
            }


        }).catch(error => {
             
        })
    }
    render() {
        let ee = this.state.divtype.length
        if (ee != 0) {
            return (
                <div>
                    <Carousel responsive={responsive}>

                        {this.state.divtype.map(prodd =>
                            <div>
                                <Container>
                                    <Link className="aa" to={'/ShowProduct?product=' + prodd.id} >
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
                    <ReactLoading type="spin" color="#fff" height={'10%'} width={'10%'} />
                </div>
            )
        }

    }
}
