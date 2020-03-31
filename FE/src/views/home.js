import React, { Component } from 'react';
import banner1 from '../img/banner1.jpg';
import banner2 from '../img/banner2.jpg';
import banner3 from '../img/banner3.png';
import p1 from '../img/p1.jpg'
import p2 from '../img/p2.jpg'
import p3 from '../img/p3.jpg'
import g1 from '../img/g1.png'
import g2 from '../img/g2.png'
import g3 from '../img/g3.png'
import CarouselProduct from '../components/CarouselProduct'
import CarouselCategory from '../components/CarouselCategory'
import CaruoselShop from '../components/CarouselShop'
import Header from '../components/header';
import Footer from '../components/Footer';
// import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

// import '../css/App.css';
// import {Navbar ,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap';
import axios from 'axios';
import ROOT_API from '../config/API'
import URL_img from '../config/URL_img'
import {
  Carousel,
  Container,
  Row,
  Col,
  Card,
  Button, Image
} from 'react-bootstrap'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import '../css/home.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      banner: [],
      src: []
    }
  }

  componentWillMount() {
    axios.get(ROOT_API + "/api/banner").then(response => {
      this.setState({ banner: response.data })
      let dd = this.state.banner.length
      const id = this.state.banner.map(banner => banner.id_banner)
      const name = this.state.banner.map(banner => banner.name_banner)
      const img = this.state.banner.map(banner => banner.img_banner)
      for (let index = 0; index < dd; index++) {
        this.setState({
          src: [...this.state.src, {
            'id': id[index],
            'name': name[index],
            'src': img[index]
          }]
        })
      }
    }).catch(error => {});
  }
  render() {
    return (
      <div>

        <Header />
        <Carousel>
          {this.state.src.map(src =>
            <Carousel.Item>
              <img
                className="d-block w-100"
                key={src.id}
                src={URL_img + src.src}
                alt="First slide"
              />
            </Carousel.Item>
          )}
        </Carousel>
        <Container>
          <br />
          <br />

          <h1 className="cat2">
            {cookies.get('Language') == undefined && 'สินค้า'}
            {cookies.get('Language') == 'th' && 'สินค้า'}
            {cookies.get('Language') == 'en' && 'SALE'}
          </h1>
          <hr className="cathr" />
          <CarouselProduct />

        </Container>

        <br /><br />
        <div className="categoly">
          <br />
          <Container>

            <h1 className="cat1">
              {cookies.get('Language') == undefined && 'หมวดหมู่'}
              {cookies.get('Language') == 'th' && 'หมวดหมู่'}
              {cookies.get('Language') == 'en' && 'CATEGOLY'}
            </h1>
            <hr className="cathr2" />
            <CarouselCategory />
          </Container>
          <br />
        </div>
        <br /><br />
        <Container>
          <h1 className="cat2">

            {cookies.get('Language') == undefined && 'ร้านค้า'}
            {cookies.get('Language') == 'th' && 'ร้านค้า'}
            {cookies.get('Language') == 'en' && 'SHOP'}
          </h1>
          <hr className="cathr" />
          <CaruoselShop />
        </Container>


        <Footer />
      </div>
    )
  }
}
export default Home