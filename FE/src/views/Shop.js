import React, { Component } from 'react';
import { FaBeer, FaEdit } from 'react-icons/fa';
import { FiSave } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import ROOT_API from '../config/API'
import URL_img from '../config/URL_img'
import Header from '../components/header';
import Footer from '../components/Footer';
import { default as NumberFormat } from 'react-number-format';
import Cookies from 'universal-cookie';
import CardProduct from '../components/CardProduct';
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Container, Row, Col, Image, Nav, Card, Button, Modal, Carousel, Alert } from 'react-bootstrap';
import '../css/shop.css'

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableDiv: true, disableDiv2: false, disableDiv3: false, key: 0,
      delis: [], post: [], divfollow: '', posshot: '', dd: ''
    };
    this.disableDiv = this.disableDiv.bind(this);
    this.disableDiv2 = this.disableDiv2.bind(this);

  }

  componentWillMount() {
    this.setState({
      disableDiv: true, disableDiv2: false, disableDiv3: false, key: 0,
      delis: [], post: [], divfollow: '', posshot: '', deliDiv: ''
    })
    const search = this.props.location.search;  // could be '?foo=bar'
    const params = new URLSearchParams(search);
    const shop = params.get('n'); // bar    
    this.setState({ posshot: <CardProduct shop={shop} />, dd: shop })
    //(shop)
    const cookies = new Cookies();
    if (cookies.get('ID_Login') != undefined) {
      axios.get(ROOT_API + "/api/follow?id_user=" + cookies.get('ID_Login')
        + "&id_shop=" + shop).then(response => {
          let fol = response.data.length
          if (fol > 0) {
            this.setState({
              divfollow: <>
                <Button className="btnbuy" id={response.data[0].date_follow} onClick={this.unfollow.bind(this)} >เลิกติดตาม</Button>
              </>
            })
          } else {
            axios.get(ROOT_API + "/api/shop/" + shop).then(response => {
              if (response.data.id_user == cookies.get('ID_Login')) {
                this.props.history.push('/MyShop?shop=' + shop)
              } else {
                this.setState({
                  divfollow: <>
                    <Button className="btnbuy" onClick={this.follow.bind(this)} >ติดตาม</Button>
                  </>
                })
              }
            }).catch(error => {});
          }

        }).catch(error => {});
    } else {
      this.setState({
        divfollow: <>
          <Button className="btnbuy"><Link to="Signin">ติดตาม</Link></Button>
        </>
      })
    }


    axios.get(ROOT_API + "/api/shop/" + shop).then(response => {
      this.setState({
        src: URL_img + response.data.img_shop
      })
      this.setState({ post: response.data });
    }).catch(error => {});

    axios.get(ROOT_API + "/api/deliveryMethod").then(response => {
      this.setState({ delis: response.data });

      const id_shop2 = this.state.delis.map(deli => deli.id_shop);
      const name_delivery_method2 = this.state.delis.map(deli => deli.name_delivery_method);
      const value_delivery_method2 = this.state.delis.map(deli => deli.value_delivery_method);
      for (let index = 0; index < id_shop2.length; index++) {

        if (id_shop2[index] == shop) {
          //('delivery', name_delivery_method2[index])
          this.setState({
            deliDiv: <>{this.state.deliDiv}<Card style={{ border: '.5px solid #2222' }}>
              <h2>รายละเอียด : {name_delivery_method2[index]}</h2>
              <h3>ค่าบริการ : {value_delivery_method2[index]}</h3>
            </Card></>
          })
        }

      }
    }).catch(error => {});



  }
  componentDidUpdate() {
    const search = this.props.location.search;  // could be '?foo=bar'
    const params = new URLSearchParams(search);
    const shop = params.get('n'); // bar   

    if (this.state.dd != shop) {
      this.setState({ posshot: <CardProduct shop={shop} />, dd: shop })
      this.componentWillMount()
      //("qqqq")
    }
  }
  nav(key) {
    //('selected ' + key);
    this.setState({ key });
  }
  disableDiv() {
    this.setState({
      disableDiv: true,
      disableDiv2: false,
      disableDiv3: false
    });

  }
  disableDiv2() {

    this.setState({
      disableDiv: false,
      disableDiv2: true,
      disableDiv3: false
    });

  }
  follow(e) {
    const search = this.props.location.search; // could be '?foo=bar'
    const params = new URLSearchParams(search);
    const shop = params.get('n'); // bar    
    const cookies = new Cookies();
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours('00'); //Current Hours
    const min = new Date().getMinutes('00'); //Current Minutes
    const sec = new Date().getSeconds('00'); //Current Seconds
    const date_now = year + "-" + month + "-" + date + " " + hours + ":" + min + ":" + sec;
    axios.post(ROOT_API + "/api/follow?id_user=" + cookies.get('ID_Login')
      + "&id_shop=" + shop + "&date_follow=" + date_now).then(response => {
        this.setState({
          divfollow: <>
            <Button className="btnbuy" onClick={this.unfollow.bind(this)} id={date_now} >เลิกติดตาม</Button>
          </>
        })
      }).catch(error => {});
  }
  unfollow(e) {
    axios.delete(ROOT_API + "/api/follow/" + e.target.id).then(response => {
      this.setState({
        divfollow: <>
          <Button className="btnbuy" onClick={this.follow.bind(this)} >ติดตาม</Button>
        </>
      })
    }).catch(error => {});
  }
  render() {
    var divStyle = {
      display: this.state.disableDiv ? 'block' : 'none'
    }; var divStyle2 = {
      display: this.state.disableDiv2 ? 'block' : 'none'
    };
    return (
      <div>

        <Header />
        <Container>
          <br />


          <Nav variant="tabs" activeKey={this.state.key} onSelect={this.nav.bind(this)}>
            <Nav.Item>
              <Nav.Link className='aa a1' eventKey={0} onClick={this.disableDiv}>ข้อมูลร้านค้า</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className='aa a1' eventKey={1} onClick={this.disableDiv2}>สินค้าทั้งหมด</Nav.Link>
            </Nav.Item>

          </Nav>
          <Row style={{ backgroundColor: '#fff' }}>
            {/* {this.state.post.img_shop} */}
            <Col sm={2}></Col>
            <Col sm={8} style={divStyle}>
              <br />
              <Container>
                <Row>
                  {/* <Col className="nameshop" >
                    <Image style={{ height: 100, width: 100 }} src={this.state.src} roundedCircle />
                    <h2>
                      &nbsp;&nbsp; : {this.state.post.name_shop}&nbsp;&nbsp;
                    </h2>
                    {this.state.divfollow}
                  </Col> */}
                  <Col sm={3} style={{textAlign:'center'}}>
                    <Image style={{ height: 100, width: 100 ,marginBottom:'10px'}} src={this.state.src} roundedCircle /> </Col>
                  <Col className="nameshop"> <h2>
                     {this.state.post.name_shop}&nbsp;&nbsp;
                    </h2>
                    {this.state.divfollow}
                  </Col>

                </Row>

                <Row>
                  <Col ><h3>เลขที่ผู้เสียภาษี : {this.state.post.tax_id}&nbsp;</h3></Col>
                </Row>
                <Row>
                  <Col ><h3>ที่อยู่ร้านค้า : {this.state.post.address_shop}&nbsp;</h3></Col>
                </Row>
                <Row>
                  <Col ><h3>โทร : {this.state.post.tel_shop}&nbsp;</h3></Col>
                </Row>




                {/* <input type="text" className="form-control" placeholder="" onChange={this.nameedit.bind(this)} 
                value={this.state.post.name_shop} />
                <textarea class="form-control" rows="5" id="comment" value={this.state.post.address_shop}></textarea> */}
              </Container>
              <hr />
              <h3>วิธีการจัดส่ง : </h3>
              {this.state.deliDiv}

            </Col>
            <Col sm={2}></Col>
          </Row>
          <Row style={{ backgroundColor: '#fff' }}>
            <Col style={divStyle2}>
              <Container> <br /><hr />
                <Row>

                  {/* {this.state.typeps} */}


                </Row>
                <Row>
                  {/* {this.state.prosDiv} */}
                  {this.state.posshot}

                </Row>

              </Container>


            </Col>
          </Row>



        </Container>
        <Footer />
      </div>
    )
  }
}
export default Shop
